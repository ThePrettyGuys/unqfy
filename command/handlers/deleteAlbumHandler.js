const Handler = require('./handler');

class DeleteAlbumHandler extends Handler{
    constructor() {
        super("DeleteAlbum", ['artistName', 'albumName']);
     }

     canHandle(aCommand) {
         return this.command === aCommand;
    }

    handle(unqfy, albumData) {
        this.validate(albumData);
        unqfy.deleteAlbumFrom(albumData.artistName, albumData.albumName);
        console.log("Album eliminado exitosamente");
    }
}

module.exports = DeleteAlbumHandler;