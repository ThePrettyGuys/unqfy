class DeleteAlbumHandler {
    constructor() {
       this.command = "DeleteTrack";
    }

    canHandle(aCommand) {
         return this.command === aCommand;
    }

    handle(unqfy, trackData) {
        if(this.validateData(trackData)){
            unqfy.deleteTrackFrom(trackData.artistName, trackData.albumName)
        }
    }
       
    validateData(data) {
        let hasData = Boolean(data);
        let hasCompleteData = Boolean((data || {}).artistName) && Boolean((data || {}).trackName);
    
        if (!hasData || !hasCompleteData) {
            console.log(`No se pudo completar la operación. Faltan datos: ${(data || {}).artistName } ${(data|| {}).tracktName}`);
        }
        
        return hasData && hasCompleteData;
    }
}

module.exports = DeleteAlbumHandler;