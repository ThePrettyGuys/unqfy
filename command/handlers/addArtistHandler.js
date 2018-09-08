class AddArtistHandler {
    constructor() {
       return this.command = "AddArtist";
    }

    canHandle(aCommand) {
        return this.command === aCommand.toString();
    }

    handle(unqfy, artistData) {
        console.log('Se agregará al artista con name: {' + artistData.name + '} y country: {' + artistData.country + '}.');
        unqfy.addArtist(artistData);
        console.log('Artista agregado satisfactoriamente.');
        return unqfy;
    }
}

module.exports = AddArtistHandler;