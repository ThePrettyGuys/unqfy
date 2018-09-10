const flatMap = require('array.prototype.flatmap');
const IdGenerator = require('./idGenerator');
const NotFoundException = require('../errors/notFoundException');
const Artist = require('./artist');
const Album = require('./album');
const Track = require('./track');

class ArtistManager {
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

    addTrackToAlbum(artistName, albumName, trackData) {
        let artist= this.getArtistByName(artistName);
        if(!Boolean(artist)){
            throw new NotFoundException('Artist');
        }
        let { name, duration, genres } = trackData;
        
        let id = IdGenerator.generate();
        let newTrack = new Track(id, name, duration, genres);
     
        artist.addTrackToAlbum(albumName, newTrack);

        return newTrack;
    }


    getArtistByName(artistName) {
        return this.artists.find(anArtist => anArtist.sameName(artistName));
    }

    getAllTracks(){
        return flatMap(this.artists, anArtist => anArtist.getTracks());
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

    getAllAlbums() {
        return flatMap(this.artists, anArtist => anArtist.albums);
    }

    deleteArtistByName(artistName){
        let artistToDelete = this.getArtistByName(artistName);
        if(!Boolean(artistToDelete)){
            throw new NotFoundException('Artist');
        }
        return this.deleteArtist(artistToDelete);
    }

    /*
    Mensajes Privados
     */

    getArtistById(artistId) {
        return this.artists.find(anArtist => anArtist.sameId(artistId));
    }

    getAlbumById(albumId) {
        let album = this.getAllAlbums().find(anAlbum => anAlbum.sameId(albumId));
        if(!Boolean(album)){
            throw new NotFoundException('Album');
        }
        return album;
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
        if(!Boolean(artistToDelete)){
            throw new NotFoundException('Artist');
        }
        return this.deleteArtist(artistToDelete);
    }

    deleteArtist(artistToDelete){
        if(!Boolean(artistToDelete)){
            throw new NotFoundException('Artist');
        }
        let tracksToDelete = artistToDelete.getTracks();
        let indexOfArtist = this.getIndexOfArtist(artistToDelete);

        this.deleteArtistInPosition(indexOfArtist);

        return tracksToDelete;
    }

    deleteArtistInPosition(indexOfArtist) {
        if (indexOfArtist > -1) {
            this.artists.splice(indexOfArtist, 1);
        }
    }

    deleteTrackFromAlbum(artistName, albumName, trackName){
        let artist = this.getArtistByName(artistName);
        if(!Boolean(artist)){
            throw new NotFoundException('Artist');
        }
        let deletedTrack= artist.deleteTrackFromAlbum(albumName, trackName);

        return deletedTrack;
    }

    getIndexOfArtist(anArtist) {
        return this.artists.indexOf(anArtist);
    }
    
}

module.exports = ArtistManager;