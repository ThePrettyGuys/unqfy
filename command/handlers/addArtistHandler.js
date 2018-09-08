class AddArtistHandler {
    constructor() {
       this.command = "AddArtist";
    }

    canHandle(aCommand) {
        return this.command === aCommand;
    }

    handle(unqfy, artistData) {
        if(this.validateData(artistData)){
            console.log(`Se agregará al artista con name: {${artistData.name}} y country: {${artistData.country} }.`);
            unqfy.addArtist(artistData);
            console.log('Artista agregado satisfactoriamente.');
            return unqfy;
        }
    }

    validateData(data) {
        let hasData = Boolean(data);
        let hasCompleteData = Boolean((data || {}).name) && Boolean((data || {}).country);

        if (!hasData || !hasCompleteData) {
            console.log(`No se pudo completar la operación. Los datos son incorrectos: ${(data || {}).name} ${(data || {}).country} `);
        }
        return hasData && hasCompleteData;
    }
}

module.exports = AddArtistHandler;