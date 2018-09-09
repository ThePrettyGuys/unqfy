class CreatePlaylistHandler {

    constructor() {
       this.command = "CreatePlaylist";
    }

    canHandle(aCommand) {
        return this.command === aCommand;
    }

    handle(unqfy, playlistData) {
        //Esto lo voy a refactorear mucho mas lindo con mas info linda al usuario
        if(playlistData.name === undefined || playlistData.genres === undefined || playlistData.maxDuration === undefined){
            console.log("Faltan parametros!")
        }else{
            console.log(unqfy.createPlaylist(playlistData.name, playlistData.genres, playlistData.maxDuration));
        }
    }

}

module.exports = CreatePlaylistHandler;