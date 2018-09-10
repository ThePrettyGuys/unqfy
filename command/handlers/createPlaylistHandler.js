const InvalidDataException = require('../../errors/invalidDataException');
const Validator = require('../../errors/validator');

class CreatePlaylistHandler {

    constructor() {
       this.command = "CreatePlaylist";
    }

    canHandle(aCommand) {
        return this.command === aCommand;
    }
    
    handle(unqfy, playlistData) {
        let validator = new Validator(playlistData);
        if(!validator.isValidFor(['name', 'genres', 'maxDuration'])){
            throw new InvalidDataException(this.command, playlistData)
        }
        let {name, genres, maxDuration} = playlistData;
        unqfy.createPlaylist(name, genres, maxDuration);
        console.log(`Se creó la playlist: { ${name} } de duracion maxima: { ${maxDuration} }, para los generos: { ${genres} }`);
    }
}

module.exports = CreatePlaylistHandler;