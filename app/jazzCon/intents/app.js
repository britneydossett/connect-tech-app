'use strict';
const makeCard = require('./makeCard'),
    _ = require('lodash');

/**
  * Watercooler contains all of the custom and built in intents we are using for the skill.
**/


let jazzCon = function (app) {
    app.makeCard = makeCard;
    // app.marvelAPI = marvelAPI;
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
     **/
    require('./customIntents/launch.js')(app);

    /**
     *  Amazon built-in intents:
     *      AMAZON.NextIntent,
     *      AMAZON.PauseIntent,
     *      AMAZON.ResumeIntent,
     *      AMAZON.StopIntent,
     *      AMAZON.CancelIntent
     *      AMAZON.HelpIntent
     **/


};

module.exports = jazzCon;
