'use strict';

module.exports = function (app) {
    app.intent('getRonSwansonQuote', function (request, response) {
        return app.ronSwansonApi.getQuote()
        .then( (quote) => {
            let finalQuote = quote;
            app.makeCard(finalQuote, response);
            // return response.say(`${finalQuote}`).shouldEndSession(true).send();
            return response.audioPlayerPlayStream('REPLACE_ALL', {
                        "url": 'http://api.soundcloud.com/tracks/13158665',
                        "token": 'playlist',
                        "offsetInMilliseconds": 0
                    }).send();
        });
    });
};
