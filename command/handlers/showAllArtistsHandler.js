class ShowAllArtistsHandler {
    constructor() {
       this.command = "ShowAllArtists";
     }

     canHandle(aCommand) {
        return this.command === aCommand;
    }

    handle(unqfy, albumData) {
        let artists= unqfy.artists;
        switch(artists.length){
            case 0: console.log ("Aun no hay artistas cargados en UNQFY. Agrega uno ahora!");
                    break;
            default: console.log(artists);
                     break;
        }
    }

}

module.exports = ShowAllArtistsHandler;