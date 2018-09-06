class AddArtistHandler {
    constructor() {
        this.command = 'AddArtist';
    }

    canHandle(aCommand) {
        // return this.command === aCommand;
        return true;
    }

    handle(unqfy, artistData) {
        unqfy.addArtist(artistData);
        return unqfy;
    }
}

module.exports = AddArtistHandler;