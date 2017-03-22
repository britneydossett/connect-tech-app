'use strict';

const config = require('../../config/config'),
    request = require('request-promise'),
    baseURL = config.get('audioApi').v1.url;

function getPlaylist(name) {
    let artistName = name.toLowerCase();
    
}
