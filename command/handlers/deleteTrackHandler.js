const HandlerWithValidator = require('./handlerWithValidator');
const NotFoundException = require('../../errors/notFoundException');

class DeleteAlbumHandler extends HandlerWithValidator {
    constructor() {
        super("DeleteTrack", ['trackName', 'albumName', 'artistName']);
    }

    canHandle(aCommand) {
         return this.command === aCommand;
    }

    //TODO: Excepcion sin catchear si el track, album o artista no existe
    handle(unqfy, trackData) {
        this.validate(trackData);
        let {artistName, albumName, trackName} = trackData;

        try{
            unqfy.deleteTrackFrom(artistName, albumName, trackName);
            console.log(`Se eliminó el track: ${trackName}`);
            return unqfy;
        }catch (error) {
            if (error instanceof NotFoundException) {
                console.log(error.messageDetail(`No se pudo eliminar el track: ${trackName}.`));
            } else {
                throw error;
            }
        }
    }
}


module.exports = DeleteAlbumHandler;