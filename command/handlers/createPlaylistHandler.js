class CreatePlaylistHandler {

    constructor() {
       this.command = "CreatePlaylist";
    }

    canHandle(aCommand) {
        return this.command === aCommand;
    }

    handle(unqfy, playlistData) {
        if(this.validateData(playlistData)){
            console.log(`Se creará la playlist: { ${name} }`);
            let {name, genres, maxDuration} = playlistData;
            unqfy.createPlaylist(name, genres, maxDuration);
            console.log(`Se creó la playlist: { ${name} } de duracion maxima: { ${maxDuration} }, para los generos: { ${genres} }`);
        }
    }

    validateData(data) {
        let hasData = Boolean(data);
        let hasCompleteData = Boolean((data || {}).name) && Boolean((data || {}).genres) && Boolean((data || {}).maxDuration);

        if (!hasData || !hasCompleteData) {
            console.log(`No se pudo completar la operación. Los datos son incorrectos: ${(data || {}).name }, ${(data|| {}).genres}, ${(data|| {}).maxDuration}`);
        }
        return hasData && hasCompleteData;
    }
}

module.exports = CreatePlaylistHandler;