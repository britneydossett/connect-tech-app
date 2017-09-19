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
         response.say('Hello Connect Tech! You can hear a Ron Swanson Quote, or I can play you a song. What would like to hear?');
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
                 trackImage = `https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=0ahUKEwjx-IqX5-rSAhUp0YMKHU99DIYQjRwIBw&url=http%3A%2F%2Fswansonquotes.com%2Ftag%2Ftammy%2F&psig=AFQjCNH4MgvwWW1VmMkitYufwqsh9U1CSg&ust=1490295945335488`,
                 audioPlayerPayload = {
                     url: 'https://listen.vo.llnwd.net/g3/1/2/4/9/1/1355519421.mp3',
                     token: trackName,
                     offsetInMilliseconds: 0
                 };
             app.makeCard(trackName, response, trackImage);
             return response.audioPlayerPlayStream('ENQUEUE', audioPlayerPayload)
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
         return response.say('Goodbye Connect Tech!')
                             .shouldEndSession(true)
                             .send();
     });

};

module.exports = connectTech;
