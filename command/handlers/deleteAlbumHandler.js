const HandlerWithValidator = require('./handlerWithValidator');
const NotFoundException = require('../../errors/notFoundException');

class DeleteAlbumHandler extends HandlerWithValidator{
    constructor() {
        super("DeleteAlbum", ['artistName', 'albumName']);
     }

     canHandle(aCommand) {
         return this.command === aCommand;
    }

    handle(unqfy, albumData) {
        this.validate(albumData);
        let {artistName, albumName} = albumData;
        try{
            unqfy.deleteAlbumFrom(artistName, albumName);
            console.log(`Se eliminó para el artista: ${artistName}, el album: ${albumName}`);
            return unqfy;
        }catch (error) {
            if (error instanceof NotFoundException) {
                console.log(error.messageDetail(`No se pudo eliminar el album: ${albumName}.`));
            } else {
                throw error;
            }
        }
    }
}

module.exports = DeleteAlbumHandler;