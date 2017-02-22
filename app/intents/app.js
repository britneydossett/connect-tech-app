'use strict';
const makeCard = require('./makeCard'),
    _ = require('lodash'),
    moment = require('moment');

/**
  * Watercooler contains all of the custom and built in intents we are using for the skill.
**/


let jazzCon = function (app) {
    app.makeCard = makeCard;
    app.watercoolerUserAPI = watercoolerUserAPI;
    app._ = _;
    app.moment = moment;

    /**
     * app.pre is run before every request.
     */
    app.pre = function (request) {

    };


    /**
     *  Custom Intents:
     *      whatsTheLatest,
     *      whatsTheLatestOn,
     *      getTopicName
     *      listTopics,
     *      moreTopics,
     *      launch
     **/
    require('./customIntents/whatsTheLatest')(app);
    require('./customIntents/whatsTheLatestOn')(app);
    require('./customIntents/getTopicName')(app);
    require('./customIntents/listTopics')(app);
    require('./customIntents/moreTopics')(app);
    require('./customIntents/launch')(app);
    require('./customIntents/sessionEnded')(app);

    /**
     *  Amazon built-in intents:
     *      AMAZON.NextIntent,
     *      AMAZON.PauseIntent,
     *      AMAZON.ResumeIntent,
     *      AMAZON.StopIntent,
     *      AMAZON.CancelIntent
     *      AMAZON.HelpIntent -> ./help.js
     **/
    require('./amazonIntents/help')(app);
    require('./amazonIntents/next')(app);
    require('./amazonIntents/pause')(app);
    require('./amazonIntents/resume')(app);
    require('./amazonIntents/stop')(app);
    require('./amazonIntents/cancel')(app);

    /**
     * Audioplayer Events
     *      Audioplayer.PlaybackNearlyFinished
     */
    require('./audioPlayerEvents/playbackNearlyFinished')(app);

};

module.exports = watercooler;
