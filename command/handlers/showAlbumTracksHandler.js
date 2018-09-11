const Handler = require('./handler');

class ShowAlbumTracksHandler extends Handler {
    constructor() {
        super("ShowAlbumTracks", ['albumName']);
     }

     canHandle(aCommand) {
        return this.command === aCommand;
    }

    //TODO: Cambiar el console.log de errores por excepciones y catchearlas.
    handle(unqfy, trackData) {
        this.validate(trackData);

        let album = unqfy.getAlbumByName(trackData.albumName);
        if(!album){
            console.log(`No se pudo completar la operación. No existe un album de nombre: ${trackData.albumName}`);
        } else {
            switch(album.tracks.length){
                case 0: console.log (`No hay albums para el artista ${trackData.albumName}`); break;
                default: console.log(album.tracks);
            }
        }
    
    }


}

module.exports = ShowAlbumTracksHandler;