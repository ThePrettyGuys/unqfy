const HandlerWithValidator = require('./handlerWithValidator');

class ShowAllArtistAlbumHandler extends HandlerWithValidator {
    constructor() {
        super("ShowAllArtistAlbum", ['artistName']);
     }

     canHandle(aCommand) {
        return this.command === aCommand;
    }

    //TODO: Cambiar console.log de errores por excepcion y catchearla.
    //TODO: Es un handler, tiene mucho codigo. Pasar a metodo en unqfy.
    handle(unqfy, artistData) {
        this.validate(artistData);

        let artist= unqfy.getArtistByName(artistData.artistName);
        if(!artist){
            console.log(`No se pudo completar la operación. No existe un artista de nombre: ${artistData.artistName}`)
        } else {
            switch(artist.getAllAlbums().length){
                case 0 : console.log (`No hay albums para el artista ${artist.name}`);
                         break;
                default: console.log (artist.getAllAlbums());
            }
        }
    }

}

module.exports = ShowAllArtistAlbumHandler;