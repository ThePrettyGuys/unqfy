const IdGenerator = require('./idGenerator');
const Playlist = require('./playlist');

class PlaylistManager {
    constructor(){
        this.playlists =[];
    }

    getPlaylistById(playlistId) {
        return this.playlists.find(aPlaylist => aPlaylist.sameId(playlistId));
    }

    /*** Crea una playlist y la agrega a unqfy. ***
     El objeto playlist creado debe soportar (al menos):
     * una propiedad name (string)
     * un metodo duration() que retorne la duración de la playlist.
     * un metodo hasTrack(aTrack) que retorna true si aTrack se encuentra en la playlist.
     */
    createPlaylist(name, genresToInclude, maxDuration, tracks) {
        let tracksMatchingSomeGenre = this.getTracksMatchingGenres(tracks, genresToInclude);
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

    getPlaylistsThatContainsInName(aWord) {
        return this.playlists.filter(aPlaylist => aPlaylist.containsInName(aWord));
    }

    deleteFromPlaylists(tracksToDelete) {
        this.playlists.forEach(playlist => playlist.deleteTracks(tracksToDelete));
    }

    getTracksMatchingGenres(tracks, genres) {
        return tracks.filter(aTrack => aTrack.belongsToSomeGenres(genres));
    }
}

module.exports = PlaylistManager;