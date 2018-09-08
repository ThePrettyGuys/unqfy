class AddTrackHandler {
    constructor() {
        this.command = "AddTrack";
     }

     canHandle(aCommand) {
        return this.command === aCommand;
    }

    handle(unqfy, trackData) {
        if(this.validateData(trackData)){
            console.log(`Se agregará el track: { ${trackData.name} } al album: { ${trackData.album} }`);
            let album= unqfy.getAlbumByName(trackData.album);
            if(Boolean(album)){
                let {name, duration, genres} = trackData;
                unqfy.addTrack(album.id,{name, duration, genres});
                console.log (`Se ha agregado el track "${trackData.name}" al album "${trackData.album}"`);
                return unqfy;
            }
            console.log(`Error al agregar Track. No hay un album de nombre ${trackData.album}`);
        }
    }

    validateData(data) {
        let hasData = Boolean(data);
        let hasCompleteData = Boolean((data || {}).name) && Boolean((data || {}).album);

        if (!hasData || !hasCompleteData) {
            console.log(`No se pudo completar la operación. Los datos son incorrectos: ${(data || {}).name } ${(data|| {}).album}`);
        }
        return hasData && hasCompleteData;
    }
}

module.exports = AddTrackHandler;