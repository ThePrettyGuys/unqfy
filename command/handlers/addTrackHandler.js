const HandlerWithValidator = require('./handlerWithValidator');
const NotFoundException = require('../../errors/notFoundException');

class AddTrackHandler extends HandlerWithValidator{
    constructor() {
        super("AddTrack", ['name', 'album', 'duration', 'genres', 'artistName']);
     }

     canHandle(aCommand) {
        return this.command === aCommand;
    }

    handle(unqfy, trackData) {
        let {artistName, album: albumName} = trackData;
        this.validate(trackData);
        let track = null;
        try{
            track = unqfy.addTrackTo(albumName, artistName, trackData);
            console.log(`Se agregó satisfactoriamente el track: ${track.name}`);
            return unqfy;
        }catch (error) {
            if (error instanceof NotFoundException) {
                console.log(error.messageDetail('No se pudo agregar un track.'));
            } else {
                throw error;
            }
        }


    }
}

module.exports = AddTrackHandler;