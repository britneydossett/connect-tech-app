'use strict';

module.exports = function (app) {
    app.intent('AMAZON.CancelIntent', (request, response) => {
        return response.say('Goodbye JazzCon!')
                            .shouldEndSession(true)
                            .send();
    });
};
