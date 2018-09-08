class UNQfy {
    constructor(playlistService, artistService) {
        this.artistService = artistService;
        this.playlistService = playlistService;
    }

    addArtist(artistData) {
        return this.artistService.addArtist(artistData);
    }

    addAlbumTo(artistName, albumData){
        let artist= this.artistService.getArtistByName(artistName);
        if(Boolean(artist)){
            return this.addAlbum(artist.id,albumData);
        }
        console.log(`No se pudo completar la operación. No existe un artista de nombre: ${albumData.artistName}`)
    }

    /* Crea un album y lo agrega al artista con id artistId.
      El objeto album creado debe tener (al menos):
       - una propiedad name (string)
       - una propiedad year (number)
    */
    addAlbum(artistId, albumData) {
        return this.artistService.addAlbum(artistId, albumData);
    }

    /* Crea un track y lo agrega al album con id albumId.
    El objeto track creado debe tener (al menos):
        - una propiedad name (string),
        - una propiedad duration (number),
        - una propiedad genres (lista de strings)
    */
    addTrack(albumId, trackData) {
        return this.artistService.addTrack(albumId, trackData);
    }

    createPlaylist(name, genresToInclude, maxDuration) {
        let tracks = this.artistService.getAllTracks();
        return this.playlistService.createPlaylist(name, genresToInclude, maxDuration, tracks);
    }

    getTracksMatchingGenres(genres){
        let tracks = this.artistService.getAllTracks();
        return this.playlistService.getTracksMatchingGenres(tracks, genres);
    }

    searchByName(aName){
        let foundArtistsThings = this.artistService.searchAllByName(aName);
        let foundPlaylists = this.playlistService.getPlaylistsThatContainsInName(aName);
        let searchResult = {};
        Object.assign(searchResult, foundArtistsThings, {playlists: foundPlaylists});

        return searchResult;
    }

    getAlbumByName(albumName) {
        return this.artistService.getAllAlbums().find(anAlbum => anAlbum.sameName(albumName));
    }

    getTracksMatchingArtist(artistName) {
        let artist = this.artistService.getArtistByName(artistName);
        return artist.getTracks();
    }

    deleteArtistByName(artistName){
        let tracksToDelete = this.artistService.deleteArtistByName(artistName);
        return this.deleteTracksFromPlayslists(tracksToDelete);
    }

    deleteArtistById(artistId){
        let tracksToDelete = this.artistService.deleteArtistById(artistId);
        return this.deleteTracksFromPlayslists(tracksToDelete);
    }

    deleteTracksFromPlayslists(tracksToDelete) {
        if (Boolean(tracksToDelete)) {
            this.playlistService.deleteFromPlaylists(tracksToDelete);
        }
        return Boolean(tracksToDelete);
    }
}

module.exports = UNQfy;