const rp = require('request-promise');
const spotifyURL = require('./endpoints').SPOTIFYURL;

class SpotifyService {

    getAlbumsForArtist(artistName){
        const options = {
            url: `${spotifyURL}artists/get-artists-albums/`,
            headers: { Authorization: 'Bearer ' + 'ACCESS_TOKEN' },
            json: true,
        };
        return rp.get(options).then(console.log);
    }

}

module.exports = SpotifyService;