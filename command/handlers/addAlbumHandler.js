const InvalidDataException = require('../../errors/invalidDataException');
const Validator = require('../../errors/validator');

class AddAlbumHandler {
    constructor() {
       this.command = "AddAlbum";
     }

     canHandle(aCommand) {
         return this.command === aCommand;
    }

    handle(unqfy, albumData) {
        let validator = new Validator(albumData);
        if(!validator.isValidFor(['name', 'artistName'])){
            throw new InvalidDataException(this.command, albumData)
        }

        let {name, year} = albumData;
        let addedAlbum= unqfy.addAlbumTo(albumData.artistName, {name, year});
        console.log(`Se agregó satisfactoriamente al artista: ${addedAlbum.name}`);
        return unqfy;
    }
}

module.exports = AddAlbumHandler;