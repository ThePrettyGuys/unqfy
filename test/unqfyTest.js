/* eslint-env node, mocha */

const assert = require('chai').assert;
const UNQfy = require('../unqfy/unqfy');
const PlaylistManager = require('../model/playlistManager');
const ArtistManager = require('../model/artistsManager');

function createAndAddArtist(unqfy, artistName, country) {
    return unqfy.addArtist({ name: artistName, country });
}

function createAndAddAlbum(unqfy, artistName, albumName, albumYear) {
    let albumData = { name: albumName, year: albumYear };
    return unqfy.addAlbumTo(artistName, albumData);
}

function createAndAddTrack(unqfy, albumName, artistName, trackName, trackDuraction, trackGenres) {
    let trackData = { name: trackName, duration: trackDuraction, genres: trackGenres };
    return unqfy.addTrackTo(albumName, artistName, trackData);
}


describe('Add, remove and filter data', () => {
    let unqfy = null;

    beforeEach(() => {
        let playlistManager = new PlaylistManager();
        let artistManager = new ArtistManager();
        unqfy = new UNQfy(playlistManager, artistManager);
    });

    it('should add an artist', () => {
        const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');

        assert.equal(artist.name, 'Guns n\' Roses');
        assert.equal(artist.country, 'USA');

    });

    it('should add an album to an artist', () => {
        const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
        const album = createAndAddAlbum(unqfy, artist.name, 'Appetite for Destruction', 1987);

        assert.equal(album.name, 'Appetite for Destruction');
        assert.equal(album.year, 1987);
    });

    it('should add a track to an album', () => {
        const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
        const album = createAndAddAlbum(unqfy, artist.name, 'Appetite for Destruction', 1987);
        const track = createAndAddTrack(unqfy, album.name, artist.name, 'Welcome to the jungle', 200, ['rock', 'hard rock']);

        assert.equal(track.name, 'Welcome to the jungle');
        assert.strictEqual(track.duration, 200);
        assert.isTrue(track.genres.includes('rock'));
        assert.isTrue(track.genres.includes('hard rock'));
        assert.lengthOf(track.genres, 2);
    });

    it('should find different things by name', () => {
        const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
        const album1 = createAndAddAlbum(unqfy, artist.name, 'Roses Album', 1987);
        const track = createAndAddTrack(unqfy, album1.name, artist.name, 'Roses track', 200, ['pop', 'movie']);
        const playlist = unqfy.createPlaylist('Roses playlist', ['pop'], 1400);

        const results = unqfy.searchByName('Roses');

        assert.isTrue(results['artists'].includes(artist));
        assert.isTrue(results['albums'].includes(album1));
        assert.isTrue(results['tracks'].includes(track));
        assert.isTrue(results['playlists'].includes(playlist));
    });

    it('should get all tracks matching genres', () => {
        const artist1 = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
        const album1 = createAndAddAlbum(unqfy, artist1.name, 'Appetite for Destruction', 1987);
        const t0 = createAndAddTrack(unqfy, album1.name, artist1.name, 'Welcome to the jungle', 200, ['rock', 'hard rock', 'movie']);
        const t1 = createAndAddTrack(unqfy, album1.name, artist1.name, 'Sweet Child o\' Mine', 500, ['rock', 'hard rock', 'pop', 'movie']);

        const artist2 = createAndAddArtist(unqfy, 'Michael Jackson', 'USA');
        const album2 = createAndAddAlbum(unqfy, artist2.name, 'Thriller', 1987);
        const t2 = createAndAddTrack(unqfy, album2.name, artist2.name, 'Trhiller', 200, ['pop', 'movie']);
        createAndAddTrack(unqfy, album2.name, artist2.name, 'Another song', 500, ['classic']);
        const t3 = createAndAddTrack(unqfy, album2.name, artist2.name, 'Another song II', 500, ['movie']);

        const tracksMatching = unqfy.getTracksMatchingGenres(['pop', 'movie']);
        
        assert.isArray(tracksMatching);
        assert.lengthOf(tracksMatching, 4);
        assert.equal(tracksMatching.includes(t0), true);
        assert.equal(tracksMatching.includes(t1), true);
        assert.equal(tracksMatching.includes(t2), true);
        assert.equal(tracksMatching.includes(t3), true);
    });

    it('should get all tracks matching artist', () => {
        const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
        const album = createAndAddAlbum(unqfy, artist.name, 'Appetite for Destruction', 1987);
        const t1 = createAndAddTrack(unqfy, album.name, artist.name, 'Welcome to the jungle', 200, ['rock', 'hard rock']);
        const t2 = createAndAddTrack(unqfy, album.name, artist.name, 'It\'s so easy', 200, ['rock', 'hard rock']);

        const album2 = createAndAddAlbum(unqfy, artist.name, 'Use Your Illusion I', 1992);
        const t3 = createAndAddTrack(unqfy, album2.name, artist.name, 'Don\'t Cry', 500, ['rock', 'hard rock']);

        const artist2 = createAndAddArtist(unqfy, 'Michael Jackson', 'USA');
        const album3 = createAndAddAlbum(unqfy, artist2.name, 'Thriller', 1987);
        createAndAddTrack(unqfy, album3.name, artist2.name, 'Thriller', 200, ['pop', 'movie']);
        createAndAddTrack(unqfy, album3.name, artist2.name, 'Another song', 500, ['classic']);
        createAndAddTrack(unqfy, album3.name, artist2.name, 'Another song II', 500, ['movie']);

        const matchingTracks = unqfy.getTracksMatchingArtist(artist.name);

        assert.isArray(matchingTracks);
        assert.lengthOf(matchingTracks, 3);
        assert.isTrue(matchingTracks.includes(t1));
        assert.isTrue(matchingTracks.includes(t2));
        assert.isTrue(matchingTracks.includes(t3));
    });
});

describe('Playlist Creation and properties', () => {
    let unqfy = null;

    beforeEach(() => {
        let playlistManager = new PlaylistManager();
        let artistManager = new ArtistManager();
        unqfy = new UNQfy(playlistManager, artistManager);
    });

    it('should create a playlist as requested', () => {
        const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
        const album = createAndAddAlbum(unqfy, artist.name, 'Appetite for Destruction', 1987);
        const t1 = createAndAddTrack(unqfy, album.name, artist.name, 'Welcome to the jungle', 200, ['rock', 'hard rock', 'movie']);
        createAndAddTrack(unqfy, album.name, artist.name, 'Sweet Child o\' Mine', 1500, ['rock', 'hard rock', 'pop', 'movie']);

        const artist2 = createAndAddArtist(unqfy, 'Michael Jackson', 'USA');
        const album2 = createAndAddAlbum(unqfy, artist2.name, 'Thriller', 1987);
        const t2 = createAndAddTrack(unqfy, album2.name, artist2.name, 'Thriller', 200, ['pop', 'movie']);
        const t3 = createAndAddTrack(unqfy, album2.name, artist2.name, 'Another song', 500, ['pop']);
        const t4 = createAndAddTrack(unqfy, album2.name, artist2.name, 'Another song II', 500, ['pop']);

        const playlist = unqfy.createPlaylist('my playlist', ['pop', 'rock'], 1400);

        assert.equal(playlist.name, 'my playlist');
        assert.isAtMost(playlist.duration(), 1400);
        assert.isTrue(playlist.hasTrack(t1));
        assert.isTrue(playlist.hasTrack(t2));
        assert.isTrue(playlist.hasTrack(t3));
        assert.isTrue(playlist.hasTrack(t4));
        assert.lengthOf(playlist.tracks, 4);
    });
});

describe('Populate albums for artist', () => {
    let unqfy = null;

    beforeEach(() => {
        let playlistManager = new PlaylistManager();
        let artistManager = new ArtistManager();
        unqfy = new UNQfy(playlistManager, artistManager);
    });

    it('should populate albums for an artist as requested', () => {
        const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
        unqfy.populateAlbumsForArtist('Guns n\' Roses');

        assert.equal(artist.getAllAlbums(), []);
    });
});
