'use strict';

module.exports = function (app) {
    app.intent('AMAZON.CancelIntent', (request, response) => {
        response.say('Goodbye Jazz Con!');
        response.audioPlayerStop();
        response.shouldEndSession(true).send();
    });

};
