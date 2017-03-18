'use strict';

module.exports = function (app) {
    app.intent('AMAZON.CancelIntent', function (request, response) {
        response.say('Goodbye Jazz Con!');
        response.audioPlayerStop();
        response.shouldEndSession(true).send();
    });

};
