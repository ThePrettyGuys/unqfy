/* eslint-env node, mocha */

const assert = require('chai').assert;
const IdGenerator = require('../model/idGenerator');
const PlaylistManager = require('../model/playlistManager');
const Track = require('../model/track');

describe('PlaylistManager', () => {
    let playlistManager = null;
    let tracks = [];
    let track1 = null;
    let track2 = null;
    let track3 = null;
    let track4 = null;
    let playlist = null;
    let playlist2  = null;

    before(() => {
        playlistManager = new PlaylistManager();
        track1 = new Track(IdGenerator.generate(), 'track 1', 1000, ['rock', 'rap']);
        track2 = new Track(IdGenerator.generate(), 'track 2', 150, ['rock', 'pop']);
        track3 = new Track(IdGenerator.generate(), 'track 3', 200, ['rock', 'pop']);
        track4 = new Track(IdGenerator.generate(), 'track 4', 10, ['electronica', 'rap']);

        tracks.push(track1);
        tracks.push(track2);
        tracks.push(track3);
        tracks.push(track4);

        playlist = playlistManager.createPlaylist('Nueva playlist', ['rock'], 500, tracks);
        playlist2 = playlistManager.createPlaylist('playlist', ['electronica', 'rap'], 1100, tracks);
    });

    it('should create a playlist', () => {
        let playlist1 = playlistManager.createPlaylist('Otra playlist', ['rock'], 500, tracks);

        assert.equal(playlist1.name, 'Otra playlist');
        assert.equal(playlist1.maxDuration, 500);
        assert.equal(playlist1.duration(), 350);
        assert.isTrue(playlist1.hasTrack(track2));
        assert.isTrue(playlist1.hasTrack(track3));
    });

    it('should get tracks matching genres', () => {

        let matchingTracks = playlistManager.getTracksMatchingGenres(tracks, ['electronica']);


        assert.isArray(matchingTracks);
        assert.lengthOf(matchingTracks, 1);
        assert.isTrue(matchingTracks.includes(track4));

    });

    it('should get playlists that contain in name', () => {
        let matchingTracks = playlistManager.getPlaylistsThatContainsInName('Nueva');

        assert.isArray(matchingTracks);
        assert.lengthOf(matchingTracks, 1);
        assert.isTrue(matchingTracks.includes(playlist));

    });

    it('should delete from playlists received tracks', () => {
        let toDelete = [track3, track4];
        assert.isTrue(playlist.hasTrack(track3));
        assert.isTrue(playlist2.hasTrack(track4));

        playlistManager.deleteFromPlaylists(toDelete);

        assert.isFalse(playlist.hasTrack(track3));
        assert.isFalse(playlist2.hasTrack(track4));

    });
});