const rp = require('request-promise');
const BASE_URL = require('./endpoints').MUSIXMATCHURL;

class MusixMatchService {
    getLyrics(artistName, trackName) {
        let options = { uri: BASE_URL + 'track.search',
                qs: {
                    apikey: 'c70f4f109e104fbf9632e254c14de361',
                    q_artist: artistName,
                    q_track: trackName
                },
                json: true
         };
        return rp.get(options)
        .then(response => {
            let parsedTrackId = this.parsedTrackIdFromResponse(response);
            let options = {
                uri: BASE_URL + 'track.lyrics.get',
                qs: {
                    apikey: 'c70f4f109e104fbf9632e254c14de361',
                    track_id: parsedTrackId
                },
                json: true
            };
            return rp.get(options)
        })
        .then(response => { return this.parsedLyricsFromResponse(response)});
    }

    parsedTrackIdFromResponse(response){
        let tracks = response.message.body.track_list;
        let track = tracks.find(element => element.track.has_lyrics == 1);
        return track.track.track_id;
    }

    parsedLyricsFromResponse(response){
        return response.message.body.lyrics.lyrics_body
    }
}

module.exports = MusixMatchService 