const InvalidDataException = require('../../errors/invalidDataException');
const Validator = require('../../errors/validator');

class AddTrackHandler {
    constructor() {
        this.command = "AddTrack";
     }

     canHandle(aCommand) {
        return this.command === aCommand;
    }

    //node main.js AddTrack --artistName="Ana" --name="Sol de mediodia" --album="Greatest Hits" --duration=500 --genres rock pop
    handle(unqfy, trackData) {
        let validator = new Validator(trackData);
        if(!validator.isValidFor(['name', 'album', 'duration', 'genres', 'artistName'])){
            throw new InvalidDataException(this.command, trackData)
        } 
        unqfy.addTrackToAlbum(trackData.artistName, trackData.album, trackData);
        console.log("Track agregado exitosamente");
    }
}

module.exports = AddTrackHandler;