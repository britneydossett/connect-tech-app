'use strict';

const nconf = require('nconf');

let environment,
    port,
    config;

config = {
    default: {
        appName: 'jazz-con-app'
    },
    dev: {
        ronSwansonApi: {
            v1: {
                url: 'http://ron-swanson-quotes.herokuapp.com/v2'
            }
        }
    }
};
//http://comicvine.gamespot.com/api/characters/?api_key=888021d98fae1ce9b14430adad16bfea971f5ca0&filter=name:thor&format=json

nconf.env().argv();
// make sure we have an environment set or die
environment = nconf.get('ENVIRONMENT');
port = nconf.get('PORT');

if (typeof environment === 'undefined' || typeof port === 'undefined') {
    console.error(`ENVIRONMENT and/or PORT are not set. Shutting down.  ENVIRONMENT: ${environment} - PORT: ${port}`);
    process.exit(1);
}

// load the correct config based on environment
switch (environment.toLowerCase()) {
    case 'dev':
        nconf.defaults(config.dev);
        console.log('Using Dev Config');
        break;
    default:
        console.log('using default');
        nconf.defaults(config.default);
}
/*
 * Load overrides that don't actually override anything, they just fill in the
 * blanks.
 */
nconf.overrides(config.default);


module.exports = nconf;
