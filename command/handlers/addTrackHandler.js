const Handler = require('./handler');

class AddTrackHandler extends Handler{
    constructor() {
        super("AddTrack", ['name', 'album', 'duration', 'genres', 'artistName']);
     }

     canHandle(aCommand) {
        return this.command === aCommand;
    }

    handle(unqfy, trackData) {
        this.validate(trackData);
        unqfy.addTrackToAlbum(trackData.artistName, trackData.album, trackData);
        console.log("Track agregado exitosamente");
    }
}

module.exports = AddTrackHandler;