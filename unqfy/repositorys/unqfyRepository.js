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
const AlbumObserver = require('../../unqfy/albumObserver');

class UnqfyRepository{
    save(unqfy, filename) {
        const listenersBkp = this.listeners;
        this.listeners = [];

        const serializedData = picklify.picklify(unqfy);

        this.listeners = listenersBkp;
        fs.writeFileSync(filename, JSON.stringify(serializedData, null, 2));
    }

    load(filename) {
        const serializedData = fs.readFileSync(filename, { encoding: 'utf-8' });
        const classes = [UNQfy, Artist, Album, Track, Playlist, PlaylistManager, ArtistManager, MusixMatchService, AlbumObserver];
        return picklify.unpicklify(JSON.parse(serializedData), classes);
    }
}

module.exports = UnqfyRepository;