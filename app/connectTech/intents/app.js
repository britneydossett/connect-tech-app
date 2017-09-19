'use strict';
const makeCard = require('./lib/makeCard.js'),
    ronSwansonApi = require('./lib/ronSwansonApi.js'),
    audiofiles = require('./lib/audiofile.js'),
    _ = require('lodash');

/**
  * Watercooler contains all of the custom and built in intents we are using for the skill.
**/


let connectTech = function (app) {
    app.makeCard = makeCard;
    app.ronSwansonApi = ronSwansonApi;
    app.audiofiles = audiofiles;
    app._ = _;

    /**
     * app.pre is run before every request.
     */
    // app.pre = function (request) {
    //
    // };


    /**
     *  Custom Intents:
     *      launch
     *      getRonSwansonQuote
     *      audioPlayer
     **/
     app.launch(function (request, response) {
         response.say('Hello Connect Tech! You can hear a Ron Swanson Quote, or play the talking heads. What would like to hear?');
         response.shouldEndSession(false, 'What did you say?').send();
     });

     app.intent('getRonSwansonQuote', (request, response) => {
         return app.ronSwansonApi.getQuote()
         .then( (quote) => {
             let finalQuote = quote;
             app.makeCard(finalQuote, response, 'ron');
             return response.say(`Ron Swanson Says: ${finalQuote}.
                                 Would you like to hear another quote?`)
                                 .shouldEndSession(false, 'Say that again?')
                                 .send();
         });
     });

     app.intent('audioPlayer', {
         slots: {NAME: 'NAME'}
     }, (request, response) => {
         let name = request.slot('NAME');
         return app.audiofiles.getPlaylist(name)
         .then( (playlist) => {
             let track = playlist.preview_url,
                 trackName = playlist.name,
                 trackImage = playlist.album.images[0].url,
                 audioPlayerPayload = {
                    url: track,
                    token: trackName,
                    expectedPreviousToken: 'some_previous_token',
                    offsetInMilliseconds: 0
                 };
             app.makeCard(trackName, response, trackImage);
             return response.audioPlayerPlayStream('ENQUEUE', audioPlayerPayload)
                     .send();
         }).catch((error) => {
             console.log('error', error);
         });
     });

    /**
     *  Amazon built-in intents:
     *      AMAZON.NextIntent,
     *      AMAZON.PauseIntent,
     *      AMAZON.ResumeIntent,
     *      AMAZON.StopIntent,
     *      AMAZON.CancelIntent
     *      AMAZON.HelpIntent
     **/
     app.intent('AMAZON.CancelIntent', (request, response) => {
         return response.say('Goodbye Connect Tech!')
                             .shouldEndSession(true)
                             .send();
     });

};

module.exports = connectTech;
