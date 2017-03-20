'use strict';

let init = function (app) {
    app.launch((request, response) => {
        response.say('Hello Jazz Con! Would you like to hear a Ron Swanson joke, or play the Talking Heads?');
        response.shouldEndSession(false, 'I\'m sorry. I didnt get that. What would you like to hear?').send();
    });
};

module.exports = init;
