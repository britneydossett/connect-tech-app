'use strict';

module.exports = function (app) {
    app.intent('audioPlayer', {
        slots: {NAME: 'NAME'}
    }, function (request, response) {
        let name = request.slot('NAME');
        return app.audiofiles.getPlaylist(name)
        .then( (playlist) => {
            let track = playlist.preview_url,
                trackName = playlist.name,
                trackImage = playlist.album.images[0].url,
                audioPlayerPayload = {
                    url: track,
                    token: trackName,
                    offsetInMilliseconds: 0
                };
            app.makeCard(trackName, response, trackImage);
            return response.audioPlayerPlayStream('REPLACE_ALL', audioPlayerPayload).send();
        });
    });
};
