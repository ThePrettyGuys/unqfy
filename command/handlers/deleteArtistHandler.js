const HandlerWithValidator = require('./handlerWithValidator');

class DeleteArtistHandler extends HandlerWithValidator {
    constructor() {
        super("DeleteArtist", ['name']);
    }

    canHandle(aCommand) {
        return this.command === aCommand;
    }

    //TODO: Excepcion sin catchear si no existe el artista.
    handle(unqfy, artistData) {
        this.validate(artistData);
        unqfy.deleteArtistByName(artistData.name);
        console.log('Artista eliminado.');
    }
}

module.exports = DeleteArtistHandler;