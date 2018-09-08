const fs = require('fs'); // necesitado para guardar/cargar unqfy
const UNQfy = require('./unqfy'); // importamos el modulo unqfy
const PlaylistService = require('./playlistService');

class UnqfyFileSystem{
    static getUNQfy(filename) {
        let playlistService = new PlaylistService();
        let unqfy = new UNQfy(playlistService);
        if (fs.existsSync(filename)) {
            unqfy = UNQfy.load(filename);
        }
        return unqfy;
    }

    static saveUNQfy(unqfy, filename) {
        unqfy.save(filename);
    }

}

module.exports = UnqfyFileSystem;