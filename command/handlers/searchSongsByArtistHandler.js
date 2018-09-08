class SearchSongsByArtistHandler {
    constructor() {
        this.command = "SearchSongsFrom";
     }

     canHandle(aCommand) {
        return this.command === aCommand.toString();
    }

    handle(unqfy, searchData) {
        let artist= unqfy.getArtistByName(searchData.artistName);
        if( artist === undefined){
            console.log("No existe un artista de nombre: "+searchData.artistName);
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