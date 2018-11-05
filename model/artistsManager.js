const flatMap = require('array.prototype.flatmap');
const IdGenerator = require('./idGenerator');
const NotFoundException = require('../errors/notFoundException');
const ResourceAlreadyExistsException = require('../errors/resourceAlreadyExistsException');
const RelatedResourceNotFoundException = require('../errors/relatedResourceNotFoundException');
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
        if (!this.getArtistByName(artistData.name)){
            let newArtist = new Artist(id, name, country);
            this.artists.push(newArtist);
            return newArtist;
        } else {
            throw new ResourceAlreadyExistsException();
        }
    }

    addAlbumTo(artistName, albumData){
        let artist= this.getArtistByName(artistName);
        let newAlbum = this.createAlbum(albumData);
        artist.addAlbum(newAlbum);
        return newAlbum;
    }

    addTrackTo(albumName, artistName, trackData) {
        let artist= this.getArtistByName(artistName);
        if(!Boolean(artist)){
            throw new NotFoundException('Artist', artistName);
        }
        let newTrack = this.createTrack(trackData,artistName);
        artist.addTrackToAlbum(albumName, newTrack);
        return newTrack;
    }

    getArtistTracksByName(artistName){
        let artist= this.getArtistByName(artistName);
        if(!Boolean(artist)){
            throw new NotFoundException('Artist', artistName);
        }

        return artist.getTracks();
    }

    getArtistById(artistId){
        let artistResult = this.artists.find(anArtist => anArtist.sameId(artistId));
        if(!artistResult){
            throw new RelatedResourceNotFoundException();
        } else {
            return artistResult
        }
    }

    getArtistByName(artistName) {
        return this.artists.find(anArtist => anArtist.sameName(artistName));
    }

    getArtistsWhoContainInName(aWord){
        let artistsResult = this.artists.filter(anArtist => anArtist.containsInName(aWord));
        if (artistsResult.length){
            return artistsResult;
        } else {
            throw new NotFoundException('Artist', aWord);
        }
    }

    getTrackById(trackId){
        return this.getAllTracks().find(track => track.sameId(trackId));
    }

    getAllTracks(){
        return flatMap(this.artists, anArtist => anArtist.getTracks());
    }

    getAllArtists(){
        return this.artists;
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
            throw new NotFoundException('Artist', artistName);
        }
        return this.deleteArtist(artistToDelete);
    }

    getAlbumsByArtistName(artistName){
        let artist = this.getArtistByName(artistName);
        if(!Boolean(artist)){
            throw new NotFoundException('Artist', artistName);
        }
        return artist.getAllAlbums();
    }

    getAlbumById(albumId){
        return this.getAllAlbums().find(anAlbum => anAlbum.sameId(albumId));
    }

    /*
    Mensajes Privados
     */

    createAlbum(albumData) {
        let { name, year } = albumData;
        let id = IdGenerator.generate();
        return new Album(id, name, year);
    }

    createTrack(trackData, artistName) {
        let { name, duration, genres } = trackData;
        let id = IdGenerator.generate();
        return new Track(id, name, duration, genres, artistName);
    }

    getAlbumsThatContainsInName(aWord) {
        return this.getAllAlbums().filter(anAlbum => anAlbum.containsInName(aWord));
    }

    getTracksThatContainsInName(aWord) {
        return this.getAllTracks().filter(aTrack => aTrack.containsInName(aWord));
    }

    /**
     * receive an valid artist
     * @param artistToDelete
     * @returns array with deleted tracks
     */
    deleteArtist(artistToDelete){
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
            throw new NotFoundException('Artist', artistName);
        }
        let deletedTrack= artist.deleteTrackFromAlbum(albumName, trackName);

        return deletedTrack;
    }

    getIndexOfArtist(anArtist) {
        return this.artists.indexOf(anArtist);
    }

    deleteAlbumById(albumId){
        return this.artists.forEach(a => a.deleteAlbumIfItExists(albumId));
    }
}

module.exports = ArtistManager;