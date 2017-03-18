'use strict';

let init = function (app) {
    app.launch(function (request, response) {
        response.say('Hello Jazz Con! What would you like to do?');
        response.shouldEndSession(false, 'What did you say?').send();
    });
};

module.exports = init;
