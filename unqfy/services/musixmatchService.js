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
           console.log(response.message.body.artist_list[0].artist.artist_id)
           return response.message.body.artist_list[0].artist.artist_id 
        }).then((id)=>{

        })
        .catch((error) => {
            console.log('Algo salio mal', error);
        });
    }

    _getLyrics(artistID,trackName){
       
    }


}

module.exports = MusixMatchService 