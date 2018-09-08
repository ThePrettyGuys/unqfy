class AddAlbumHandler {
    constructor() {
       this.command = "AddAlbum";
     }

     canHandle(aCommand) {
         return this.command === aCommand;
    }

    handle(unqfy, albumData) {
        if(this.validateData(albumData)){
            console.log(`Se agregará el album: { ${albumData.name} } al artista: { ${albumData.artistName} }`);
            let artist= unqfy.getArtistByName(albumData.artistName);
            if(Boolean(artist)){
                let {name, year} = albumData;
                unqfy.addAlbum(artist.id,{name, year});
                console.log('Album agregado satisfactoriamente.');
                return unqfy;
            }
            console.log(`No se pudo completar la operación. No existe un artista de nombre: ${albumData.artistName}`)
        }
    }

    validateData(data) {
        let hasData = Boolean(data);
        let hasCompleteData = Boolean((data || {}).name) && Boolean((data || {}).artistName);

        if (!hasData || !hasCompleteData) {
            console.log(`No se pudo completar la operación. Los datos son incorrectos: ${(data || {}).name } ${(data|| {}).artistName}`);
        }
        return hasData && hasCompleteData;
    }
}

module.exports = AddAlbumHandler;