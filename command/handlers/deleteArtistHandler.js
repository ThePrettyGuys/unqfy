const HandlerWithValidator = require('./handlerWithValidator');
const NotFoundException = require('../../errors/notFoundException');

class DeleteArtistHandler extends HandlerWithValidator {
    constructor() {
        super("DeleteArtist", ['name']);
    }

    canHandle(aCommand) {
        return this.command === aCommand;
    }

    handle(unqfy, artistData) {
        this.validate(artistData);
        let {name} = artistData;
        try{
            unqfy.deleteArtistByName(name);
            console.log(`Se eliminó el artista: ${name}`);
            return unqfy;
        }catch (error) {
            if (error instanceof NotFoundException) {
                console.log(error.messageDetail(`No se pudo eliminar el artista: ${name}.`));
            } else {
                throw error;
            }
        }
    }
}

module.exports = DeleteArtistHandler;