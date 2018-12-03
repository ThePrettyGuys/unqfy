const rp = require('request-promise');
const spotifyURL = require('./endpoints');
const tokens = require('../spotifyCreds');
const accessToken = tokens.access_token;

class SpotifyService {
    constructor(anArtist, artistManager){
        this.artist = anArtist;
        this.artistManager = artistManager
    }

    populateAlbumsForArtist(){
        let urlfiedName = this.formatStringAsURL(this.artist.name);
        return this.fetchArtistByName(urlfiedName)
            .then(response => {
                let parsedId = this.parsedIdFromResponse(response);
                return this.fetchAlbumsByArtistId(parsedId);})
            .then(response => {
                let albums = this.parsedAlbumsFromResponse(response);
                return this.populateArtistsWithAlbums(albums)
            });
    }

    fetchArtistByName(urlfiedName) {
        return this.get(`${spotifyURL}/search?q=${urlfiedName}&type=artist`);
    }

    fetchAlbumsByArtistId(artistId) {
        return this.get(`${spotifyURL}/artists/${artistId}/albums`);
    }

    get(url){
        const options = {
            url: url,
            headers: { Authorization: 'Bearer ' + accessToken },
            json: true
        };
        return rp.get(options);
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