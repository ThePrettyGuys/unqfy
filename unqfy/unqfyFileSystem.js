const fs = require('fs'); // necesitado para guardar/cargar unqfy
const UNQfy = require('./unqfy'); // importamos el modulo unqfy
const PlaylistService = require('./services/playlistService');
const ArtistManager = require('../model/artistsManager');

class UnqfyFileSystem{
    constructor(unqfyRepository){
        this.repository = unqfyRepository;
    }

    getUNQfy(filename) {
        let playlistService = new PlaylistService();
        let artistManager = new ArtistManager();
        let unqfy = new UNQfy(playlistService, artistManager);
        if (fs.existsSync(filename)) {
            unqfy = this.repository.load(filename);
        }
        return unqfy;
    }

    saveUNQfy(unqfy, filename) {
        this.repository.save(unqfy, filename);
    }

}

module.exports = UnqfyFileSystem;