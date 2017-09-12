'use strict';

const config = require('../../config/config'),
    request = require('request-promise'),
    baseURL = config.get('ronSwansonApi').v1.url;

let api;

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
