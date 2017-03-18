'use strict';

let help = function (app) {
    app.intent('AMAZON.HelpIntent', function (request, response) {
        response.say(`Jazz Con allows you to get a Ron Swanson quote or play music.
                    You can ask for quotes by saying - "Alexa, get a Ron Swanson quote" - or
                    you can ask for a song by saying - "Alexa, play Talking Heads".
                    What would you like to hear?`);
        response.audioPlayerStop();
        response.shouldEndSession(false, 'I\'m sorry, I didn’t get that. Either say that again, or say – “list stories” - for the latest stories from C.N.N. .  What would you like to hear?');
        response.send();
    });
};

module.exports = help;
