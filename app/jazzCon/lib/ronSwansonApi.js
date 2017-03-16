'use strict';

let config = require('../config/config'),
    api,
    request = require('request-promise'),
    baseURL = config.get('ronSwansonApi').v1.url;

function getQuote() {

    let URL = `${baseURL}/quotes`,
        options = {
            method: 'GET',
            uri: URL,
            transform: function (quote) {
                quote = JSON.parse (quote);
                return quote;
            }
        };
    return request(options);
}

api = {
    getQuote: getQuote
};

module.exports = api;
