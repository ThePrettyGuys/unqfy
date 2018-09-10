const InvalidDataException = require('../../errors/invalidDataException');
const Validator = require('../../errors/validator');

class DeleteAlbumHandler {
    constructor() {
       this.command = "DeleteTrack";
    }

    canHandle(aCommand) {
         return this.command === aCommand;
    }

    handle(unqfy, trackData) {
        if(this.validateData(trackData)){
            let deletedTrack= unqfy.deleteTrackFrom(trackData.artistName, trackData.albumName, trackData.trackName);
            console.log(deletedTrack.name + " fue borrado exitosamente");
        }
    }
       
    validateData(trackData) {
        let validator = new Validator(trackData);
        if(!validator.isValidFor(['trackName', 'albumName', 'artistName'])){
            throw new InvalidDataException(this.command, trackData)
        } 
        
        return true;
    }
}

module.exports = DeleteAlbumHandler;