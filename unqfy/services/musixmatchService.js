const rp = require('request-promise');
const BASE_URL = require('./endpoints').MUSIXMATCHURL;


class MusixMatchService{

    getLyrics(artistName, trackName){
        let options = { uri: BASE_URL + 'matcher.lyrics.get',
                qs: {
                    apikey: 'c70f4f109e104fbf9632e254c14de361',
                    q_artist: artistName,
                    q_track: trackName
                },
                json: true // Automatically parses the JSON string in the response
             };

        return rp.get(options).then((response) => response.message.body.lyrics.lyrics_body)
        .catch((error) => {
            console.log('Algo salio mal', error);
        });
    }
}

module.exports = MusixMatchService 