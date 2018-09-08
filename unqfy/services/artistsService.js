const flatMap = require('array.prototype.flatmap');
const IdGenerator = require('../../model/idGenerator');
const Artist = require('../../model/artist');
const Album = require('../../model/album');
const Track = require('../../model/track');

class ArtistService {
    constructor(){
        this.artists =[];
    }

    addArtist(artistData) {
        let { name, country } = artistData;
        let id= IdGenerator.generate();

        let newArtist = new Artist(id, name, country);

        this.artists.push(newArtist);
        return newArtist;
    }

    addAlbum(artistId, albumData) {
        let { name, year } = albumData;
        let id = IdGenerator.generate();
        let newAlbum = new Album(id, name, year);
        let artist = this.getArtistById(artistId);

        artist.addAlbum(newAlbum);

        return newAlbum;
    }

    addTrack(albumId, trackData) {
        let { name, duration, genres } = trackData;
        let id = IdGenerator.generate();
        let newTrack = new Track(id, name, duration, genres);
        let album = this.getAlbumById(albumId);

        album.addTrack(newTrack);

        return newTrack;
    }


    searchAllByName(aName){
        let foundArtists = this.getArtistsThatContainsInName(aName);
        let foundAlbums = this.getAlbumsThatContainsInName(aName);
        let foundTracks = this.getTracksThatContainsInName(aName);

        return {
            artists: foundArtists,
            albums: foundAlbums,
            tracks: foundTracks
        };
    }

    getArtistById(artistId) {
        return this.artists.find(anArtist => anArtist.sameId(artistId));
    }

    getArtistByName(artistName) {
        return this.artists.find(anArtist => anArtist.sameName(artistName));
    }

    getAllTracks(){
        return flatMap(this.artists, anArtist => anArtist.getTracks());
    }

    getAllAlbums() {
        return flatMap(this.artists, anArtist => anArtist.albums);
    }

    getAlbumById(albumId) {
        return this.getAllAlbums().find(anAlbum => anAlbum.sameId(albumId));
    }

    getAlbumsThatContainsInName(aWord) {
        return this.getAllAlbums().filter(anAlbum => anAlbum.containsInName(aWord));
    }

    getTracksThatContainsInName(aWord) {
        return this.getAllTracks().filter(aTrack => aTrack.containsInName(aWord));
    }

    getArtistsThatContainsInName(aWord){
        return this.artists.filter(anArtist => anArtist.containsInName(aWord));
    }

    deleteArtistById(artistId){
        let artistToDelete = this.getArtistById(artistId);
        return this.deleteArtist(artistToDelete);
    }

    deleteArtistByName(artistName){
        let artistToDelete = this.getArtistByName(artistName);
        return this.deleteArtist(artistToDelete);
    }

    deleteArtist(artistToDelete){
        let tracksToDelete;
        if(Boolean(artistToDelete)){
            tracksToDelete = artistToDelete.getTracks();
            let indexOfArtist = this.getIndexOfArtist(artistToDelete);

            this.deleteArtistInPosition(indexOfArtist);
        }

        return tracksToDelete;
    }

    deleteArtistInPosition(indexOfArtist) {
        if (indexOfArtist > -1) {
            this.artists.splice(indexOfArtist, 1);
        }
    }

    getIndexOfArtist(anArtist) {
        return this.artists.indexOf(anArtist);
    }

}

module.exports = ArtistService;