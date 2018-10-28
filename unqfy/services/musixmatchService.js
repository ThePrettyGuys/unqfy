const rp = require('request-promise');
const BASE_URL = require('./endpoints').MUSIXMATCHURL;


class MusixMatchService{

    getLyrics(artistName, trackName){
        let options = { uri: BASE_URL + 'artist.search',
                qs: {
                    apikey: 'c70f4f109e104fbf9632e254c14de361',
                    q_artist: artistName,
                },
                json: true // Automatically parses the JSON string in the response
             };

        rp.get(options).then((response) => {
            var header = response.message.header;
            var body = response.message.body;
            if (header.status_code !== 200){
                                        throw new Error('status code != 200');
            }
            var artistNames = body.artist_list.map((artist => artist.artist.artist_name));
            console.log(`Se encontraron ${artistNames.length} artistas`);
            console.log(artistNames);
        }).catch((error) => {
            console.log('algo salio mal', error);
        });
    }


}

module.exports = MusixMatchService 