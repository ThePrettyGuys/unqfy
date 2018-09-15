const HandlerWithValidator = require('./handlerWithValidator');

class SearchSongsByGenreHandler extends HandlerWithValidator {
    constructor() {
        super("SearchSongsByGenre", ['genres']);
     }

     canHandle(aCommand) {
        return this.command === aCommand;
    }


    handle(unqfy, genresData) {
        this.validate(genresData);
        let {genres} = genresData;
        let tracks= unqfy.getTracksMatchingGenres(genres);
        if(tracks.length===0){
            console.log(`No existen tracks para los géneros ${genres}.`);
        }else {
            console.log(`Los tracks para los generos: ${genres}, son: `);
            console.log(tracks);
        }
    }
}

module.exports = SearchSongsByGenreHandler;