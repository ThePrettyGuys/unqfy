const HandlerWithValidator = require('./handlerWithValidator');
const NotFoundException = require('../../errors/notFoundException');

class ShowAlbumTracksHandler extends HandlerWithValidator {
    constructor() {
        super("ShowAlbumTracks", ['albumName']);
     }

     canHandle(aCommand) {
        return this.command === aCommand;
    }

    handle(unqfy, trackData) {
        this.validate(trackData);
        let{albumName} = trackData;

        try{
            let tracks = unqfy.getTracksByAlbumName(albumName);
            if(tracks.length===0){
                console.log(`No existen tracks para el album: ${albumName}.`);
            }else {
                console.log(`El album: ${albumName}, tiene los tracks: `);
                console.log(tracks);
            }
            return unqfy;
        }catch (error) {
            if (error instanceof NotFoundException) {
                console.log(error.messageDetail(`No se pueden mostrar tracks para el album: ${albumName}.`));
            } else {
                throw error;
            }
        }
    
    }


}

module.exports = ShowAlbumTracksHandler;