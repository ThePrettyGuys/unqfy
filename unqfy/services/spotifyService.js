const rp = require('request-promise');
const spotifyURL = require('./endpoints').SPOTIFYURL;
const tokens = require('../spotifyCreds');
const accessToken = tokens.access_token;

class SpotifyService {
    constructor(anArtist, artistManager){
        this.artist = anArtist;
        this.artistManager = artistManager
    }

    populateAlbumsForArtist(){
        let urlfiedName = this.formatStringAsURL(this.artist.name);
        const options = {
            url: `${spotifyURL}search?q=${urlfiedName}&type=artist`,
            headers: { Authorization: 'Bearer ' + accessToken },
            json: true,
        };
        return rp.get(options)
        .then(response => {
            let parsedId = this.parsedIdFromResponse(response);
            const options = {
                url: `${spotifyURL}artists/${parsedId}/albums`,
                headers: { Authorization: 'Bearer ' + accessToken },
                json: true,
            };
            return rp.get(options)
        })
        .then(response => {return this.parsedAlbumArrayFromResponse(response)});
    }

    formatStringAsURL(aString){
        return aString.split(' ').join('%20');
    }

    parsedIdFromResponse(response){
        return response.artists.items[0].id;
    }

    parsedAlbumArrayFromResponse(response){
        response.items.forEach(element => {
            var albumData = { name: element.name, year: element.release_date };
            this.artistManager.populateAlbumTo(this.artist.name, albumData);
        });
    }
}

module.exports = SpotifyService;