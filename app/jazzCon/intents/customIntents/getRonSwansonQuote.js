'use strict';

module.exports = function (app) {
    app.intent('getRonSwansonQuote', (request, response) => {
        return app.ronSwansonApi.getQuote()
        .then( (quote) => {
            let finalQuote = quote;
            app.makeCard(finalQuote, response);
            return response.say(`Here's a quote by Ron Swanson:
                                ${finalQuote}.
                                Would you like to hear another quote?`)
            .shouldEndSession(false, 'I\'m sorry, I didn’t get that. Please say that again.')
            .send();
        });
    });
};
