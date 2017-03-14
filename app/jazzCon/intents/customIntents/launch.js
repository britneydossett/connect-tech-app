'use strict';

let init = function (app) {
    app.launch(function (request, response) {
        response.say('Hello Jazz Con!');
        response.shouldEndSession(false, 'What did you say?').send();
    });
};

module.exports = init;
