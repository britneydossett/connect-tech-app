'use strict';

module.exports = function(app) {
    app.intent('audioPlayer', {
        slots: {NAME: NAME}
    }, (request, response) => {
        let name = request.slot('NAME');
        return app.audiofiles.getPlaylist(name)
    });
};
