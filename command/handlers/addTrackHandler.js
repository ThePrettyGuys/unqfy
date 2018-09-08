class AddTrackHandler {
    constructor() {
        return this.command = "AddTrack";
     }

     canHandle(aCommand) {
        return this.command === aCommand.toString();
    }

    handle(unqfy, trackData) {

        let album= unqfy.getAllAlbums().find( anAlbum => anAlbum.name === trackData.album);
        if(album===undefined){
            console.log("Error al agregar Track. No hay un album de nombre "+ trackData.album);
        }else{
            unqfy.addTrack(album.albumId, trackData);
            console.log ("Se ha agregado el track '" +trackData.name + "' al album '" + album.name + "' " );
        }        
    }

}

module.exports = AddTrackHandler;