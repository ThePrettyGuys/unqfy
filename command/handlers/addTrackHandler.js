const HandlerWithValidator = require('./handlerWithValidator');

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
        unqfy.addTrackTo(albumName, artistName, trackData);
        console.log("Track agregado exitosamente.");
    }
}

module.exports = AddTrackHandler;