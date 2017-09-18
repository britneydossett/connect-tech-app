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
         let number = request.slot('NAME') - 1;
         return app.audiofiles.getPlaylist()
         .then( (playlist) => {
             let track = playlist.tracks[number].previewURL,
                 trackName = playlist.tracks[number].name,
                 trackImage = `http://direct.rhapsody.com/imageserver/v2/albums/${playlist.tracks[number].albumId}/images/300x300.jpg`,
                 audioPlayerPayload = {
                     url: track,
                     token: trackName,
                     offsetInMilliseconds: 0
                 };
             app.makeCard(trackName, response, trackImage);
             return response.audioPlayerPlayStream('REPLACE_ALL', audioPlayerPayload)
                     .send();
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
         return response.say('Goodbye JazzCon!')
                             .shouldEndSession(true)
                             .send();
     });

};

module.exports = connectTech;
