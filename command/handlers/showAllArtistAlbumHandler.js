const HandlerWithValidator = require('./handlerWithValidator');
const NotFoundException = require('../../errors/notFoundException');

class ShowAllArtistAlbumHandler extends HandlerWithValidator {
    constructor() {
        super("ShowAllArtistAlbum", ['artistName']);
     }

     canHandle(aCommand) {
        return this.command === aCommand;
    }

    handle(unqfy, artistData) {
        this.validate(artistData);
        let {artistName} = artistData;

        try{
            let albums = unqfy.getAlbumsByArtist(artistName);
            if(albums.length===0){
                console.log(`No existen albums para el artista: ${artistName}.`);
            }else {
                console.log(`Los albunms para el artista: ${artistName}, son: `);
                console.log(albums);
            }
            return unqfy;
        }catch (error) {
            if (error instanceof NotFoundException) {
                console.log(error.messageDetail(`No se pueden mostrar albums para el artista: ${artistName}.`));
            } else {
                throw error;
            }
        }

    }

}

module.exports = ShowAllArtistAlbumHandler;