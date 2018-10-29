const rp = require('request-promise');
const spotifyURL = require('./endpoints');
const tokens = require('../../spotifyCreds.json');
const accessToken = tokens.access_token

class SpotifyService {
    constructor(anArtist, artistManager){
        this.artist = anArtist;
        this.artistManager = artistManager
    }

    populateAlbumsForArtist(){
        let urlfiedName = this.formatStringAsURL(this.artist.name);
        console.log("URL: " + spotifyURL.spotifyURL);
        const options = {
            url: `https://api.spotify.com/v1/search?q=${urlfiedName}&type=artist`,
            headers: { Authorization: 'Bearer ' + accessToken },
            json: true,
        };
        return rp.get(options)
        .then(response => {
            console.log("respuesta " + response);
            console.log("body " + response.body);
            let parsedId = this.parsedIdFromResponse(response);
            const options = {
                url: `https://api.spotify.com/v1/artists/${parsedId}/albums`,
                headers: { Authorization: 'Bearer ' + accessToken },
                json: true,
            };
            return rp.get(options)})
        .then(response => this.parsedAlbumArrayFromResponse(response))
        
        .catch(console.log)
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
            this.artistManager.addAlbumTo(this.artist.name, albumData);
        });
    }
}

module.exports = SpotifyService;