const InvalidDataException = require('../errors/invalidDataException');

class AddArtistHandler {
    constructor() {
       this.command = "AddArtist";
    }

    canHandle(aCommand) {
        return this.command === aCommand;
    }

    handle(unqfy, artistData) {
        let validator = new Validator(artistData);
        if(!validator.isValid()){
            throw new InvalidDataException("AddArtist")
        }

        unqfy.addArtist(artistData);
        return unqfy;
    }
}

module.exports = AddArtistHandler;