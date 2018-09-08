class SearchSongsByArtistHandler {
    constructor() {
        this.command = "SearchSongsFrom";
     }

     canHandle(aCommand) {
        return this.command === aCommand.toString();
    }

    handle(unqfy, searchData) {

      console.log(unqfy.getTracksMatchingArtist(searchData.artistName));

}

module.exports = AddAlbumHandler;