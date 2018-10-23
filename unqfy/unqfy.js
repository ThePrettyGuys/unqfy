const NotFoundException = require('../errors/notFoundException');

class UNQfy {
    constructor(playlistManager, artistManager) {
        this.artistManager = artistManager;
        this.playlistManager = playlistManager;
    }

    addArtist(artistData) {
        return this.artistManager.addArtist(artistData);
    }

    addAlbumTo(artistName, albumData){
        return this.artistManager.addAlbumTo(artistName, albumData);
    }

    addTrackTo(albumName, artistName, trackData) {
        return this.artistManager.addTrackTo(albumName, artistName, trackData);
    }

    /* Crea un album y lo agrega al artista con id artistId.
      El objeto album creado debe tener (al menos):
       - una propiedad name (string)
       - una propiedad year (number)
    */
    addAlbum(artistId, albumData) {

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

    getArtistByName(aName){
        return this.artistManager.getArtistByName(aName);
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


    populateAlbumsForArtist(artistName){
        const rp = require('request-promise');
        const options = {
                            url: 'https://developer.spotify.com/documentation/web-api/reference/artists/get-artists-albums/',
                            headers: { Authorization: 'Bearer ' + 'ACCESS_TOKEN' },
                            json: true,
        };
        rp.get(options).then((response) => console.log("Me conecte a spotify y tuve de response: "+ response));
         //hacer algo con response);
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
}

module.exports = UNQfy;