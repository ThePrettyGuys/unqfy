const Handler = require('./handler');

class ShowAllArtistsHandler extends Handler {
    constructor() {
        super("ShowAllArtists", []);
     }

     canHandle(aCommand) {
        return this.command === aCommand;
    }

    //TODO: Pasar a un metodo en unqfy.
    handle(unqfy) {
        let artists= unqfy.getAllArtists();
        switch(artists.length){
            case 0: console.log ("Aun no hay artistas cargados en UNQFY. Agrega uno ahora!");
                    break;
            default: console.log(artists);
                     break;
        }
    }

}

module.exports = ShowAllArtistsHandler;