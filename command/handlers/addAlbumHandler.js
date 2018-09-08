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
            let {name, year} = albumData;
            unqfy.addAlbumTo(albumData.artistName, {name, year});
            console.log('Album agregado satisfactoriamente.');
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