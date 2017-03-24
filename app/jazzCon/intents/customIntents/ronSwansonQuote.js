'use strict';

module.exports = function (app) {
    app.intent('getRonSwansonQuote', (request, response) => {
        return app.ronSwansonApi.getQuote()
        .then( (quote) => {
            let finalQuote = quote;
            app.makeCard(finalQuote, response, 'ron');
            return response.say(`Ron Swanson Says: ${finalQuote}.
                                Would you like to hear another quote?`)
                                .shouldEndSession(false, 'Say that again?')
                                .send();
        });
    });
};
