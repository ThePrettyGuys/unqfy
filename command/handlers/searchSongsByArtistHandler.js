const HandlerWithValidator = require('./handlerWithValidator');

class SearchSongsByArtistHandler extends HandlerWithValidator{
    constructor() {
        super("SearchSongsFrom", ['artistName']);
     }

     canHandle(aCommand) {
        return this.command === aCommand;
    }

    handle(unqfy, searchData) {
        this.validate(searchData);
        let {artistName} = searchData;
        let tracks = unqfy.getTracksMatchingArtist(artistName);
        if(tracks.length===0){
            console.log(`No existen tracks para ${artistName}.`);
        }else {
            console.log(`Los tracks para ${artistName} son:`);
            console.log(tracks);
        }
        return unqfy;
    }
}

module.exports = SearchSongsByArtistHandler;