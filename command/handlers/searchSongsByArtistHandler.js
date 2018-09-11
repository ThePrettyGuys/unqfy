const Handler = require('./handler');

class SearchSongsByArtistHandler extends Handler{
    constructor() {
        super("SearchSongsFrom", ['artistName']);
     }

     canHandle(aCommand) {
        return this.command === aCommand;
    }

    //TODO: Demasiado comportamiento para un handler. Pasar todo a un metodo en unqfy.
    //TODO: Cambiar los console.log de "No existe BLA" por excepciones y catchearlas.
    handle(unqfy, searchData) {
        this.validate(searchData);

        let artist= unqfy.getArtistByName(searchData.artistName);
        if( artist === undefined){
            console.log(`No existe un artista de nombre: ${searchData.artistName}`);
        } else {
            let tracks= unqfy.getTracksMatchingArtist(searchData.artistName);
            switch(tracks.length){
                case 0 : return console.log("No hay tracks para esta busqueda");
                default : return console.log(tracks);
            }
          }
    }
}

module.exports = SearchSongsByArtistHandler;