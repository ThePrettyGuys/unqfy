const HandlerWithValidator = require('./handlerWithValidator');
const NotFoundException = require('../../errors/notFoundException');

class AddAlbumHandler extends HandlerWithValidator {
    constructor() {
        super("AddAlbum", ['name', 'artistName']);
     }

     canHandle(aCommand) {
         return this.command === aCommand;
    }

    handle(unqfy, albumData) {
        this.validate(albumData);
        let {name, year} = albumData;
        let addedAlbum=null;
        try{
            addedAlbum= unqfy.addAlbumTo(albumData.artistName, {name, year});
            console.log(`Se agregó satisfactoriamente el album: ${addedAlbum.name}`);
            return unqfy;
        }catch (error) {
            if (error instanceof NotFoundException) {
                console.log(error.messageDetail('No se pudo agregar un album.'));
            } else {
                throw error;
            }
        }
    }
}

module.exports = AddAlbumHandler;