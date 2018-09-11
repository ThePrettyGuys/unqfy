const HandlerWithValidator = require('./handlerWithValidator');

class SearchSongsByGenreHandler extends HandlerWithValidator {
    constructor() {
        super("SearchSongsByGenre", ['genres']);
     }

     canHandle(aCommand) {
        return this.command === aCommand;
    }

    //TODO: Cambiar los console.log de "No existe BLA" por excepciones y catchearlas.
    handle(unqfy, genresData) {
        this.validate(genresData);

        let tracks= unqfy.getTracksMatchingGenres(genresData.genres);
        switch(tracks.length){
            case 0: console.log("Tu busqueda no arrojo ningún resultado"); break;
            default: console.log(tracks);
        }
    }
}

module.exports = SearchSongsByGenreHandler;