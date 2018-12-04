const picklify = require('picklify'); // para cargar/guarfar unqfy
const fs = require('fs'); // para cargar/guarfar unqfy
const Artist = require('../../model/artist');
const Album = require('../../model/album');
const Track = require('../../model/track');
const Playlist = require('../../model/playlist');
const PlaylistManager = require('../../model/playlistManager');
const ArtistManager = require('../../model/artistsManager');
const UNQfy = require('../unqfy');
const MusixMatchService = require('../services/musixmatchService');
const AlbumObserver = require('../observers/albumObserver');
const ArtistObserver = require('../observers/artistObserver');
const TrackObserver = require('../observers/trackObserver');
const EmailService = require('../services/emailService');
const LoggingService = require ('../services/loggingService');

class UnqfyRepository{
    save(unqfy, filename) {
        const listenersBkp = this.listeners;
        this.listeners = [];
        const serializedData = picklify.picklify(unqfy);
        this.listeners = listenersBkp;

        try{
            fs.writeFileSync(filename, JSON.stringify(serializedData, null, 2));
            console.log(`Se esribió en el fs satisfactoriamente, en el directorio actual: ${fs.realpathSync('.')}`);
        }
        catch (e) {
            console.log(`Al querer escribir el ${filename}, da el siguiente error: ${e}`)
        }

    }

    load(filename) {
        const serializedData = fs.readFileSync(filename, { encoding: 'utf-8' });
        const classes = [UNQfy, Artist, Album, Track, Playlist, PlaylistManager, ArtistManager, MusixMatchService, AlbumObserver, ArtistObserver, TrackObserver, EmailService, LoggingService];
        return picklify.unpicklify(JSON.parse(serializedData), classes);
    }
}

module.exports = UnqfyRepository;