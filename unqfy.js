const picklify = require('picklify'); // para cargar/guarfar unqfy
const fs = require('fs'); // para cargar/guarfar unqfy
const IdGenerator = require('./idGenerator');
const Artist = require('./artist');
const Album = require('./album');
const Track = require('./track');
const Playlist = require('./playlist');
const flatMap = require('array.prototype.flatmap');

class UNQfy {

    constructor() {
        this.artists = [];
        this.playlists = [];
        this.id = IdGenerator();
    }


    /* Crea un artista y lo agrega a unqfy.
    El objeto artista creado debe soportar (al menos):
      - una propiedad name (string)
      - una propiedad country (string)
    */
    addArtist(artistData) {
        let { name, country } = artistData;
        let newArtist = new Artist(this.id, name, country);

        this.addAnArtist(newArtist);

        return newArtist;
    }

    /* Crea un album y lo agrega al artista con id artistId.
      El objeto album creado debe tener (al menos):
       - una propiedad name (string)
       - una propiedad year (number)
    */
    addAlbum(artistId, albumData) {
        let { name, year } = albumData;
        let newAlbum = new Album(this.id, name, year);
        let artist = this.getArtistById(artistId);

        artist.addAlbum(newAlbum);

        return newAlbum;
    }

    /* Crea un track y lo agrega al album con id albumId.
    El objeto track creado debe tener (al menos):
        - una propiedad name (string),
        - una propiedad duration (number),
        - una propiedad genres (lista de strings)
    */
    addTrack(albumId, trackData) {
        let { name, duration, genres } = trackData;
        let newTrack = new Track(this.id, name, duration, genres);
        let album = this.getAlbumById(albumId);

        album.addTrack(newTrack);

        return newTrack;
    }

    searchByName(aName){
        let foundArtists = this.getArtistsThatContainsInName(aName);
        let foundAlbums = this.getAlbumsThatContainsInName(aName);
        let foundTracks = this.getTracksThatContainsInName(aName);
        let foundPlaylists = this.getPlaylistsThatContainsInName(aName);

        let foundThings = {
            artists: foundArtists,
            albums: foundAlbums,
            tracks: foundTracks,
            playlists: foundPlaylists
        };

        return foundThings;
    }

    getArtistById(artistId) {
        return this.artists.find(anArtist => anArtist.sameId(artistId));
    }

    getAlbumById(albumId) {
        return this.getAllAlbums().find(anAlbum => anAlbum.sameId(albumId));
    }

    getTrackById(trackId) {
        return this.getAllTracks().find(aTrack => aTrack.sameId(trackId));
    }

    getPlaylistById(playlistId) {

    }

    // genres: array de generos(strings)
    // retorna: los tracks que contenga alguno de los generos en el parametro genres
    getTracksMatchingGenres(genres) {
        let tracks = this.getAllTracks();
        return tracks.filter(aTrack => aTrack.belongsToSomeGenres(genres));
    }

    // artistName: nombre de artista(string)
    // retorna: los tracks interpredatos por el artista con nombre artistName
    getTracksMatchingArtist(artistName) {

    }

    /*** Crea una playlist y la agrega a unqfy. ***
     El objeto playlist creado debe soportar (al menos):
     * una propiedad name (string)
     * un metodo duration() que retorne la duración de la playlist.
     * un metodo hasTrack(aTrack) que retorna true si aTrack se encuentra en la playlist.
     */
    createPlaylist(name, genresToInclude, maxDuration) {
        let tracksMatchingSomeGenre = this.getTracksMatchingGenres(genresToInclude);
        let newPlaylist = new Playlist(this.id, name, genresToInclude, maxDuration);

        tracksMatchingSomeGenre.forEach(aTrack => {
           if(!newPlaylist.isFull()){
               newPlaylist.addTrackIfNotIsFull(aTrack);
           }
        });

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
        //COMPLETAR POR EL ALUMNO: Agregar a la lista todas las clases que necesitan ser instanciadas
        const classes = [UNQfy];
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
}

// COMPLETAR POR EL ALUMNO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
    UNQfy
};

