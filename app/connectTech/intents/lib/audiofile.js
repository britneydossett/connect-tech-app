'use strict';

const config = require('../../config/config'),
    request = require('request-promise'),
    baseURL = config.get('audioApi').v1.url;

let api;

function getPlaylist() {
    let URL = `${baseURL}`,
        options = {
            method: 'GET',
            uri: URL,
            transform: function (body) {
                body = JSON.parse (body);
                return body;
            }
        };
    return request(options);
}

api = {
    getPlaylist: getPlaylist
};

module.exports = api;
