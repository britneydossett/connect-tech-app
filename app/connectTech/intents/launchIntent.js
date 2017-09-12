'use strict';

let init = function (app) {
    app.launch(function (request, response) {
        response.say('Hello Jazz Con! You can hear a Ron Swanson Quote or you can get out of town. What would like to hear?');
        response.shouldEndSession(false, 'What did you say?').send();
    });
};

module.exports = init;
