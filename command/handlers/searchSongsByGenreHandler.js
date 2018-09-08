class SearchSongsByGenreHandler {
    constructor() {
        this.command = "SearchSongsByGenre";
     }

     canHandle(aCommand) {
        return this.command === aCommand;
    }

    handle(unqfy, genresData) {
        if (!genresData.genres){
            console.log("Por favor, especifica el genero que estas buscando");
            return;
        }
        let tracks= unqfy.getTracksMatchingGenres(genresData.genres);
        switch(tracks.length){
            case 0: console.log("Tu busqueda no arrojo ningún resultado"); break;
            default: console.log(tracks);
        }
    }
}

module.exports = SearchSongsByGenreHandler;