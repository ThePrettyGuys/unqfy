class AddArtistHandler {
    constructor() {
       this.command = "AddArtist";
    }

    canHandle(aCommand) {
        return this.command === aCommand;
    }

    handle(unqfy, artistData) {
        if(this.validateArtistData(artistData)){
            console.log('Se agregará al artista con name: {' + artistData.name + '} y country: {' + artistData.country + '}.');
            unqfy.addArtist(artistData);
            console.log('Artista agregado satisfactoriamente.');
            return unqfy;
        }
    }

    validateArtistData(artistData) {
        let hasData = Boolean(artistData);
        let hasCompleteData = Boolean((artistData || {}).name) && Boolean((artistData || {}).country);

        if (!hasData || !hasCompleteData) {
            console.log('No se pudo completar la operación. Los datos son incorrectos: ' + (artistData || {}).name + ' ' + (artistData || {}).country);
        }
        return hasData && hasCompleteData;
    }
}

module.exports = AddArtistHandler;