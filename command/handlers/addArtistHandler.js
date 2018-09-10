const InvalidDataException = require('../../errors/invalidDataException');
const Validator = require('../../errors/validator');

class AddArtistHandler {
    constructor() {
       this.command = "AddArtist";
    }

    canHandle(aCommand) {
        return this.command === aCommand;
    }

    handle(unqfy, artistData) {
        let validator = new Validator(artistData);
        if(!validator.isValidFor(['name', 'country'])){
            throw new InvalidDataException(this.command, artistData)
        }

        let addedArtist = unqfy.addArtist(artistData);
        console.log(`Se agregó satisfactoriamente al artista: ${addedArtist}`);
        return unqfy;
    }
}

module.exports = AddArtistHandler;