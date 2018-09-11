const Handler = require('./handler');

class DeleteAlbumHandler extends Handler {
    constructor() {
        super("DeleteTrack", ['trackName', 'albumName', 'artistName']);
    }

    canHandle(aCommand) {
         return this.command === aCommand;
    }

    //TODO: Excepcion sin catchear si el track, album o artista no existe
    handle(unqfy, trackData) {
        this.validate(trackData);
        let deletedTrack= unqfy.deleteTrackFrom(trackData.artistName, trackData.albumName, trackData.trackName);
        console.log(deletedTrack.name + " fue borrado exitosamente");
    }
}


module.exports = DeleteAlbumHandler;