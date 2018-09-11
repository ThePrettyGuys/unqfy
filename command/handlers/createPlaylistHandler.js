const HandlerWithValidator = require('./handlerWithValidator');

class CreatePlaylistHandler extends HandlerWithValidator {

    constructor() {
        super("CreatePlaylist", ['name', 'genres', 'maxDuration']);
    }

    canHandle(aCommand) {
        return this.command === aCommand;
    }
    
    handle(unqfy, playlistData) {
        this.validate(playlistData);
        let {name, genres, maxDuration} = playlistData;
        unqfy.createPlaylist(name, genres, maxDuration);
        console.log(`Se creó la playlist: { ${name} } de duracion maxima: { ${maxDuration} }, para los generos: { ${genres} }`);
    }
}

module.exports = CreatePlaylistHandler;