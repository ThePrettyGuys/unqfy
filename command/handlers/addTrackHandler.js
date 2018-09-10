const InvalidDataException = require('../../errors/invalidDataException');
const Validator = require('../../errors/validator');

class AddTrackHandler {
    constructor() {
        this.command = "AddTrack";
     }

     canHandle(aCommand) {
        return this.command === aCommand;
    }

    handle(unqfy, trackData) {
        let validator = new Validator(trackData);
        if(!validator.isValidFor(['name', 'album'])){
            throw new InvalidDataException(this.command, albumData)
        }
        let album= unqfy.getAlbumByName(trackData.album);
        if(Boolean(album)){
            let {name, duration, genres} = trackData;
            unqfy.addTrack(album.id,{name, duration, genres});
            console.log (`Se ha agregado el track "${trackData.name}" al album "${trackData.album}"`);
            return unqfy;
        }
    }
}

module.exports = AddTrackHandler;