const picklify = require('picklify'); // para cargar/guarfar unqfy
const fs = require('fs'); // para cargar/guarfar unqfy
const flatMap = require('array.prototype.flatmap');
const IdGenerator = require('../model/idGenerator');

const Artist = require('../model/artist');
const Album = require('../model/album');
const Track = require('../model/track');
const Playlist = require('../model/playlist');

class UNQfy {

    constructor() {
        this.artists = [];
        this.playlists = [];
    }

    /* Crea un artista y lo agrega a unqfy.
    El objeto artista creado debe soportar (al menos):
      - una propiedad name (string)
      - una propiedad country (string)
    */
    addArtist(artistData) {
        let { name, country } = artistData;
        let id= IdGenerator.generate();
        
        let newArtist = new Artist(id, name, country);

        this.addAnArtist(newArtist);

        return newArtist;
    }

    deleteArtistByName(artistName){
        let artistToDelete = this.getArtistByName(artistName);
        return this.deleteArtist(artistToDelete);
    }

    deleteArtistById(artistId){
        let artistToDelete = this.getArtistById(artistId);
        return this.deleteArtist(artistToDelete);
    }

    deleteArtist(artistToDelete){
        let isSuccessfull = Boolean(artistToDelete);

        if(isSuccessfull){
            let tracksToDelete = artistToDelete.getTracks();

            let indexOfArtist = this.getIndexOfArtist(artistToDelete);

            this.deleteFromPlaylists(tracksToDelete);
            this.deleteArtistInPosition(indexOfArtist);
        }

        return isSuccessfull;
    }

    /* Crea un album y lo agrega al artista con id artistId.
      El objeto album creado debe tener (al menos):
       - una propiedad name (string)
       - una propiedad year (number)
    */
    addAlbum(artistId, albumData) {
        let { name, year } = albumData;
        let id = IdGenerator.generate();
        let newAlbum = new Album(id, name, year);
        let artist = this.getArtistById(artistId);

        artist.addAlbum(newAlbum);

        return newAlbum;
    }

    addAlbumTo(artistName, albumData){
        let artist= this.getArtistByName(artistName);
        if(Boolean(artist)){
            return this.addAlbum(artist.id,albumData);
        }
        console.log(`No se pudo completar la operación. No existe un artista de nombre: ${albumData.artistName}`)
    }

    /* Crea un track y lo agrega al album con id albumId.
    El objeto track creado debe tener (al menos):
        - una propiedad name (string),
        - una propiedad duration (number),
        - una propiedad genres (lista de strings)
    */
    addTrack(albumId, trackData) {
        let { name, duration, genres } = trackData;
        let id = IdGenerator.generate();
        let newTrack = new Track(id, name, duration, genres);
        let album = this.getAlbumById(albumId);

        album.addTrack(newTrack);

        return newTrack;
    }

    searchByName(aName){
        let foundArtists = this.getArtistsThatContainsInName(aName);
        let foundAlbums = this.getAlbumsThatContainsInName(aName);
        let foundTracks = this.getTracksThatContainsInName(aName);
        let foundPlaylists = this.getPlaylistsThatContainsInName(aName);

        return {
            artists: foundArtists,
            albums: foundAlbums,
            tracks: foundTracks,
            playlists: foundPlaylists
        };
    }

    getAllArtists(){
        return this.artists;
    }

    getArtistById(artistId) {
        return this.artists.find(anArtist => anArtist.sameId(artistId));
    }

    getArtistByName(artistName) {
        return this.artists.find(anArtist => anArtist.sameName(artistName));
    }

    getAlbumByName(albumName) {
        return this.getAllAlbums().find(anAlbum => anAlbum.sameName(albumName));
    }

    getAlbumById(albumId) {
        return this.getAllAlbums().find(anAlbum => anAlbum.sameId(albumId));
    }

    getTrackById(trackId) {
        return this.getAllTracks().find(aTrack => aTrack.sameId(trackId));
    }

    getPlaylistById(playlistId) {
        return this.playlists.find(aPlaylist => aPlaylist.sameId(playlistId));
    }

    getTracksMatchingGenres(genres) {
        let tracks = this.getAllTracks();
        return tracks.filter(aTrack => aTrack.belongsToSomeGenres(genres));
    }

    getTracksMatchingArtist(artistName) {
        let artist = this.getArtistByName(artistName);
        return artist.getTracks();
    }

    /*** Crea una playlist y la agrega a unqfy. ***
     El objeto playlist creado debe soportar (al menos):
     * una propiedad name (string)
     * un metodo duration() que retorne la duración de la playlist.
     * un metodo hasTrack(aTrack) que retorna true si aTrack se encuentra en la playlist.
     */
    createPlaylist(name, genresToInclude, maxDuration) {
        let tracksMatchingSomeGenre = this.getTracksMatchingGenres(genresToInclude);
        let id = IdGenerator.generate();
        let newPlaylist = new Playlist(id, name, genresToInclude, maxDuration);

        tracksMatchingSomeGenre.forEach(aTrack => {
           if(!newPlaylist.isFull()){
               newPlaylist.addTrackIfCan(aTrack);
           }
        });

        this.playlists.push(newPlaylist);

        return newPlaylist;
    }

    save(filename) {
        const listenersBkp = this.listeners;
        this.listeners = [];

        const serializedData = picklify.picklify(this);

        this.listeners = listenersBkp;
        fs.writeFileSync(filename, JSON.stringify(serializedData, null, 2));
    }

    static load(filename) {
        const serializedData = fs.readFileSync(filename, { encoding: 'utf-8' });
        const classes = [UNQfy, Artist, Album, Track, Playlist];
        return picklify.unpicklify(JSON.parse(serializedData), classes);
    }

    addAnArtist(artist) {
        this.artists.push(artist);
    }

    getAllAlbums() {
        return flatMap(this.artists, anArtist => anArtist.albums);
    }

    getAllTracks(){
        return flatMap(this.artists, anArtist => anArtist.getTracks());
    }

    getArtistsThatContainsInName(aWord){
        return this.artists.filter(anArtist => anArtist.containsInName(aWord));
    }

    getAlbumsThatContainsInName(aWord) {
        return this.getAllAlbums().filter(anAlbum => anAlbum.containsInName(aWord));
    }

    getTracksThatContainsInName(aWord) {
        return this.getAllTracks().filter(aTrack => aTrack.containsInName(aWord));
    }

    getPlaylistsThatContainsInName(aWord) {
        return this.playlists.filter(aPlaylist => aPlaylist.containsInName(aWord));
    }

    getIndexOfArtist(anArtist) {
        return this.artists.indexOf(anArtist);
    }

    deleteArtistInPosition(indexOfArtist) {
        if (indexOfArtist > -1) {
            this.artists.splice(indexOfArtist, 1);
        }
    }

    deleteFromPlaylists(tracksToDelete) {
        this.playlists.forEach(playlist => playlist.deleteTracks(tracksToDelete));
    }
}

// COMPLETAR POR EL ALUMNO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
    UNQfy
};
