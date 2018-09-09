class DeleteAlbumHandler {
    constructor() {
       this.command = "DeleteAlbum";
     }

     canHandle(aCommand) {
         return this.command === aCommand;
    }

    handle(unqfy, albumData) {
        if(this.validateData(albumData)){
            unqfy.deleteAlbumFrom(albumData.artistName, albumData.albumName)
        }
    }
       
    validateData(data) {
        let hasData = Boolean(data);
        let hasCompleteData = Boolean((data || {}).albumName) && Boolean((data || {}).artistName);
    
        if (!hasData || !hasCompleteData) {
            console.log(`No se pudo completar la operación. Faltan datos: ${(data || {}).name } ${(data|| {}).artistName}`);
        }
        
        return hasData && hasCompleteData;
    }
}

module.exports = DeleteAlbumHandler;