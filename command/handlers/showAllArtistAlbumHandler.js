class ShowAllArtistAlbumHandler {
    constructor() {
       this.command = "ShowAllArtistAlbum";
     }

     canHandle(aCommand) {
        return this.command === aCommand.toString();
    }

    handle(unqfy, artistData) {
        let artist= unqfy.getArtistByName(artistData.artistName)
        if(!artist){
            console.log("No se pudo completar la operación. No existe un artista de nombre: "+ artistData.artistName)
        } else {
            switch(artist.getAllAlbums().length){
                case 0 : console.log ("No hay albums para el artista "+ artist.name);
                         break;
                default: console.log (artist.getAllAlbums());
            }
        }
    }

}

module.exports = ShowAllArtistAlbumHandler;