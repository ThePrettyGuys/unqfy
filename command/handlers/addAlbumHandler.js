class AddAlbumHandler {
    constructor() {
        return this.command = "AddAlbum";
     }

     canHandle(aCommand) {
        return this.command === aCommand.toString();
    }

    handle(unqfy, albumData) {

        console.log('Se agregará el album: {' +albumData.name+ '} al artista: {' + albumData.artistName + '}');
        let artist= unqfy.getArtistByName(albumData.artistName)
        if(!artist){
            console.log("No se pudo completar la operación. No existe un artista de nombre: "+ albumData.artistName)
        } else {
            unqfy.addAlbum(artist.id,albumData);
            console.log('Album agregado satisfactoriamente.');
            return unqfy;
        }
    }

}

module.exports = AddAlbumHandler;