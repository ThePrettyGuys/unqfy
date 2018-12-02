const NotFoundException = require('../errors/notFoundException');
const SpotifyService = require('./services/spotifyService');
const MusixMatchservice = require('./services/musixmatchService');
const BadRequestException = require('../errors/badRequestException')

class UNQfy {
    constructor(playlistManager, artistManager) {
        this.artistManager = artistManager;
        this.playlistManager = playlistManager;
        this.musicMatchService = new MusixMatchservice;
    }

    addArtist(artistData) {
        return this.artistManager.addArtist(artistData);
    }

    /* Crea un album y lo agrega al artista con id artistId.
      El objeto album creado debe tener (al menos):
       - una propiedad name (string)
       - una propiedad year (number)
    */

    addAlbumTo(artistName, albumData){
        return this.artistManager.addAlbumTo(artistName, albumData);
    }

    addAlbumToId(artistId, albumData){
        if (albumData.name == undefined || albumData.year == undefined || artistId == undefined){
            throw new BadRequestException();
        }
        let artistName = this.getArtistById(artistId).name;
        return this.addAlbumTo(artistName, albumData);
    }

    addTrackTo(albumName, artistName, trackData) {
        return this.artistManager.addTrackTo(albumName, artistName, trackData);
    }

    /* Crea un track y lo agrega al album con id albumId.
    El objeto track creado debe tener (al menos):
        - una propiedad name (string),
        - una propiedad duration (number),
        - una propiedad genres (lista de strings)
    */
    addTrack(albumId, trackData) {
        return this.artistManager.createTrack(trackData, undefined, albumId);
    }

    deleteAlbumFrom(artistName, albumNameToDelete){
        let artist = this.artistManager.getArtistByName(artistName);
        if(!Boolean(artist)){
            throw new NotFoundException('Artist', artistName);
        }
        let deletedTracks = artist.deleteAlbum(albumNameToDelete);
        this.deleteTracksFromPlayslists(deletedTracks);
    }

    deleteAlbumById(albumId){
        return this.artistManager.deleteAlbumById(albumId);
    }

    deleteTrackFrom(artistName, albumName, trackNameToDelete){
        let deletedTrack= this.artistManager.deleteTrackFromAlbum(artistName, albumName, trackNameToDelete);
        this.deleteTracksFromPlayslists([deletedTrack]);
        return deletedTrack;
    }

    createPlaylist(name, genresToInclude, maxDuration) {
        let tracks = this.artistManager.getAllTracks();
        return this.playlistManager.createPlaylist(name, genresToInclude, maxDuration, tracks);
    }

    getTracksMatchingGenres(genres){
        let tracks = this.artistManager.getAllTracks();
        return this.playlistManager.getTracksMatchingGenres(tracks, genres);
    }

    getAllArtists(){
        return this.artistManager.getAllArtists();
    }

    getAllAlbums(){
        return this.artistManager.getAllAlbums();
    }

    getArtistByName(aName){
        return this.artistManager.getArtistByName(aName);
    }

    getArtistsWhoContainInName(aWord){
        return this.artistManager.getArtistsWhoContainInName(aWord);
    }

    getAlbumsWhichContainInName(aWord){
        return this.artistManager.getAlbumsThatContainsInName(aWord);
    }

    getArtistById(artistId){
        return this.artistManager.getArtistById(artistId);
    }

    searchByName(aName){
        let foundArtistsThings = this.artistManager.searchAllByName(aName);
        let foundPlaylists = this.playlistManager.getPlaylistsThatContainsInName(aName);
        let searchResult = {};
        Object.assign(searchResult, foundArtistsThings, {playlists: foundPlaylists});
        Object.assign(searchResult, {
            isEmpty: function(){
                return this.playlists.length === 0 &&
                    this.artists.length === 0 &&
                    this.albums.length === 0 &&
                    this.tracks.length === 0
            }
        });

        return searchResult;
    }

    getTracksByAlbumName(albumName){
        let album = this.getAlbumByName(albumName);
        if(!Boolean(album)){
            throw new NotFoundException('Album', albumName);
        }
        return album.getTracks();
    }

    getAlbumsByArtist(artistName){
        let albums = this.artistManager.getAlbumsByArtistName(artistName);
        if(!Boolean(albums)){
            throw new NotFoundException('Album', albumName);
        }
        return albums;
    }

    getTracksMatchingArtist(artistName) {
        return this.artistManager.getArtistTracksByName(artistName);
    }

    deleteArtistByName(artistName){
        let tracksToDelete = this.artistManager.deleteArtistByName(artistName);
        return this.deleteTracksFromPlayslists(tracksToDelete);
    }

    deleteArtistById(artistId) {
        let artist = this.getArtistById(artistId)
        this.deleteArtistByName(artist.name)
    }

    /*
    Mensajes que interactuan con servicios externos
     */
    populateAlbumsForArtist(artistName){
        let artist = this.artistManager.getArtistByName(artistName);
        let spotifyService = new SpotifyService(artist, this.artistManager);
        return spotifyService.populateAlbumsForArtist();
    }

    getLyrics(trackId){
        let track = this.artistManager.getTrackById(trackId);
        return this.musicMatchService.getLyrics(track.artistName, track.name)
            .then(result => {return result});
    }

    /*
    Mensajes Privados
     */
    deleteTracksFromPlayslists(tracksToDelete) {
        if (Boolean(tracksToDelete)) {
            this.playlistManager.deleteFromPlaylists(tracksToDelete);
        }
    }

    getAlbumByName(albumName) {
        return this.artistManager.getAllAlbums().find(anAlbum => anAlbum.sameName(albumName));
    }

    getAlbumById(albumId) {
        return this.artistManager.getAlbumById(albumId);
    }
}

module.exports = UNQfy;