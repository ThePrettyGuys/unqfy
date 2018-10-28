const fs = require('fs'); // necesitado para guardar/cargar unqfy
const UNQfy = require('./unqfy'); // importamos el modulo unqfy
const PlaylistManager = require('../model/playlistManager');
const ArtistManager = require('../model/artistsManager');
const SpotifyService = require('./services/spotifyService')

class UnqfyFileSystem{
    constructor(unqfyRepository){
        this.repository = unqfyRepository;
    }

    getUNQfy(filename) {
        let playlistManager = new PlaylistManager();
        let artistManager = new ArtistManager();
        let spotifyService = new SpotifyService();
        let unqfy = new UNQfy(playlistManager, artistManager, spotifyService);
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