const HandlerWithValidator = require('./handlerWithValidator');


class AddAlbumHandler extends HandlerWithValidator {
    constructor() {
        super("AddAlbum", ['name', 'artistName']);
     }

     canHandle(aCommand) {
         return this.command === aCommand;
    }

    //TODO: Tira excepcion sin catchear si no encuentra el artista.
    handle(unqfy, albumData) {
        this.validate(albumData);
        let {name, year} = albumData;
        let addedAlbum= unqfy.addAlbumTo(albumData.artistName, {name, year});
        console.log(`Se agregó satisfactoriamente al artista: ${addedAlbum.name}`);
        return unqfy;
    }
}

module.exports = AddAlbumHandler;