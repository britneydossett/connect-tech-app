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
    require('./launchIntent.js')(app);
    require('./ronSwansonIntent.js')(app);
    require('./audioPlayerIntent.js')(app);

    /**
     *  Amazon built-in intents:
     *      AMAZON.NextIntent,
     *      AMAZON.PauseIntent,
     *      AMAZON.ResumeIntent,
     *      AMAZON.StopIntent,
     *      AMAZON.CancelIntent
     *      AMAZON.HelpIntent
     **/
    require('./cancelIntent.js')(app);

};

module.exports = connectTech;
