class DeleteAlbumHandler {
    constructor() {
       this.command = "DeleteAlbum";
     }

     canHandle(aCommand) {
         return this.command === aCommand;
    }

    handle(unqfy, albumData) {
        if(this.validateData(albumData)){
            switch(unqfy.deleteAlbumFrom(albumData.artistName, albumData.albumName)) {
                case true: console.log("Album eliminado exitosamente");
                           break;
                case false: console.log("El album no pudo ser eliminado. Verifique que el nombre del artista este bien escrito y el nombre del album sea correcto");
                            break;
            }
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