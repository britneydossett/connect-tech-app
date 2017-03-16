'use strict';

let init = function (app) {
    app.launch(function (request, response) {
        response.say('Hello Jazz Con! Would you like to hear what Ron Swanson has to say?');
        response.shouldEndSession(false, 'What did you say?').send();
    });
};

module.exports = init;
