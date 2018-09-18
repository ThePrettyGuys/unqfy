/* eslint-env node, mocha */

const assert = require('chai').assert;
const ArtistManager = require('../model/artistsManager');
const NotFoundException = require('../errors/notFoundException');

describe('ArtistManager', () => {
    let artistManager = new ArtistManager();

    it('should add an artist', () => {
        let artist = artistManager.addArtist({ name: 'Pepe', country: 'Mexico' });

        assert.equal(artist.name, 'Pepe');
        assert.equal(artist.country, 'Mexico');
    });

    describe('when add an album', () => {
        it('should return the added album', () => {
            let artist = artistManager.addArtist({ name: 'Pepe', country: 'Mexico' });
            let albumData = { name: 'Un album', year: 1998 };

            let album = artistManager.addAlbumTo(artist.name, albumData);

            assert.equal(album.name, 'Un album');
            assert.equal(album.year, 1998);
        });

        it('should throw an error when the artist does not exist', () => {
            assert.throws(() => artistManager.addAlbumTo('desconocido', {}), NotFoundException);
        });
    });

    describe('when add a track to album', () => {
        it('should return the added track', () => {
            let artist = artistManager.addArtist({ name: 'Pepe', country: 'Mexico' });
            let albumData = { name: 'Un album', year: 1998 };
            let album = artistManager.addAlbumTo(artist.name, albumData);
            let trackData = { name: 'Una canción', duration: 300, genres: ['rock', 'pop'] };

            let track = artistManager.addTrackTo(album.name, artist.name, trackData);

            assert.equal(track.name, 'Una canción');
            assert.strictEqual(track.duration, 300);
            assert.equal(track.genres.includes('rock'), true);
            assert.equal(track.genres.includes('pop'), true);
            assert.lengthOf(track.genres, 2);
        });

        describe('should throw an error ', () => {
            it('when the artist does not exist', () => {
                assertErrorType(
                    () => artistManager.addTrackTo('un album', 'artista desconocido', {}),
                    'Artist'
                );
            });

            it(`when the album does not exist`, () => {
                assertErrorType(
                    () => {
                        let artist = artistManager.addArtist({ name: 'Pepe', country: 'Mexico' });
                        let album = artistManager.addTrackTo('album desconocido', artist.name, {});
                    },
                    'Album'
                );
            });
        });
    });

    describe('when get tracks for artist', () => {

        it('should return the all tracks for artist', () => {
            let artistManager = new ArtistManager();

            let artist = artistManager.addArtist({ name: 'Pepe', country: 'Mexico' });
            let albumData = { name: 'Un album', year: 1998 };
            let album = artistManager.addAlbumTo(artist.name, albumData);

            let trackData = { name: 'Una canción', duration: 300, genres: ['rock', 'pop'] };
            let otherTrackData = { name: 'Otra canción', duration: 500, genres: ['rap'] };
            let track = artistManager.addTrackTo(album.name, artist.name, trackData);
            let otherTrack = artistManager.addTrackTo(album.name, artist.name, otherTrackData);

            let artistTracks = artistManager.getArtistTracksByName(artist.name);

            assert.isArray(artistTracks);
            assert.lengthOf(artistTracks, 2);
            assert.isTrue(artistTracks.includes(track));
            assert.isTrue(artistTracks.includes(otherTrack));
        });

        it('should throw an error when the artist does not exist', () => {
            assertErrorType(
                () => artistManager.getArtistTracksByName('artista desconocido'),
                'Artist'
            );
        });
    });

    describe('when get artist by name', () => {

        it('should return the artist', () => {
            let artistManager = new ArtistManager();
            artistManager.addArtist({ name: 'Pepe', country: 'Mexico' });

            let artist = artistManager.getArtistByName('Pepe');

            assert.equal(artist.name, 'Pepe');
            assert.equal(artist.country, 'Mexico');
        });

        it('should throw an error when the artist does not exist', () => {
            assertErrorType(
                () => artistManager.getArtistByName('artista desconocido'),
                'Artist'
            );
        });
    });

    it('should return all tracks', () => {
        let artistManager = new ArtistManager();

        let artist = artistManager.addArtist({ name: 'Pepe', country: 'Mexico' });
        let albumData = { name: 'Un album', year: 1998 };
        let album = artistManager.addAlbumTo(artist.name, albumData);
        let trackData = { name: 'Una canción', duration: 300, genres: ['rock', 'pop'] };
        let track = artistManager.addTrackTo(album.name, artist.name, trackData);

        let artist2 = artistManager.addArtist({ name: 'Carlos', country: 'Argentina' });
        let albumData2 = { name: 'Album dos', year: 2017 };
        let album2 = artistManager.addAlbumTo(artist2.name, albumData2);
        let trackData2 = { name: 'Una canción del dos', duration: 350, genres: ['rock', 'electronica'] };
        let track2 = artistManager.addTrackTo(album2.name, artist2.name, trackData2);

        let allTracks = artistManager.getAllTracks();

        assert.isArray(allTracks);
        assert.lengthOf(allTracks, 2);
        assert.isTrue(allTracks.includes(track));
        assert.isTrue(allTracks.includes(track2));
    });

    it('should return all things that matching name', () => {
        let artistManager = new ArtistManager();

        let artist = artistManager.addArtist({ name: 'Pepe y sus dos hermanos', country: 'Mexico' });
        let albumData = { name: 'Un album', year: 1998 };
        let album = artistManager.addAlbumTo(artist.name, albumData);
        let trackData = { name: 'Una canción', duration: 300, genres: ['rock', 'pop'] };
        let track = artistManager.addTrackTo(album.name, artist.name, trackData);

        let artist2 = artistManager.addArtist({ name: 'Carlos', country: 'Argentina' });
        let albumData2 = { name: 'Album dos', year: 2017 };
        let album2 = artistManager.addAlbumTo(artist2.name, albumData2);
        let trackData2 = { name: 'Una canción del dos', duration: 350, genres: ['rock', 'electronica'] };
        let trackData3 = { name: 'Una canción del tres', duration: 100, genres: ['rock', 'electronica'] };
        let trackData4 = { name: 'Una canción del dos y medio', duration: 350, genres: ['rock', 'electronica'] };
        let track2 = artistManager.addTrackTo(album2.name, artist2.name, trackData2);
        let track3 = artistManager.addTrackTo(album2.name, artist2.name, trackData3);
        let track4 = artistManager.addTrackTo(album2.name, artist2.name, trackData4);

        let thingsThatMatch = artistManager.searchAllByName('dos');

        assert.isObject(thingsThatMatch);

        assert.lengthOf(thingsThatMatch.artists, 1);
        assert.isTrue(thingsThatMatch.artists.includes(artist));

        assert.lengthOf(thingsThatMatch.albums, 1);
        assert.isTrue(thingsThatMatch.albums.includes(album2));

        assert.lengthOf(thingsThatMatch.tracks, 2);
        assert.isTrue(thingsThatMatch.tracks.includes(track2));
        assert.isTrue(thingsThatMatch.tracks.includes(track4));
    });

    it('should return all albums', () => {
        let artistManager = new ArtistManager();

        let artist = artistManager.addArtist({ name: 'Pepe y sus dos hermanos', country: 'Mexico' });
        let albumData = { name: 'Un album', year: 1998 };
        let album = artistManager.addAlbumTo(artist.name, albumData);

        let artist2 = artistManager.addArtist({ name: 'Carlos', country: 'Argentina' });
        let albumData2 = { name: 'Album dos', year: 2017 };
        let album2 = artistManager.addAlbumTo(artist2.name, albumData2);

        let albums = artistManager.getAllAlbums();

        assert.isArray(albums);
        assert.lengthOf(albums, 2);
        assert.isTrue(albums.includes(album));
        assert.isTrue(albums.includes(album2));
    });

    describe('when delete an artist', () => {
        let artistManager = new ArtistManager();

        let artist = artistManager.addArtist({ name: 'Pepe', country: 'Mexico' });
        let albumData = { name: 'Un album', year: 1998 };
        let album = artistManager.addAlbumTo(artist.name, albumData);

        let trackData = { name: 'Una canción', duration: 300, genres: ['rock', 'pop'] };
        let otherTrackData = { name: 'Otra canción', duration: 500, genres: ['rap'] };
        let track = artistManager.addTrackTo(album.name, artist.name, trackData);
        let otherTrack = artistManager.addTrackTo(album.name, artist.name, otherTrackData);

        it('should return all his tracks', () => {
            let deletedTracks = artistManager.deleteArtistByName(artist.name);

            assert.lengthOf(deletedTracks, 2);
            assert.isTrue(deletedTracks.includes(track));
            assert.isTrue(deletedTracks.includes(otherTrack));

            assertErrorType(
                () => artistManager.getArtistByName(artist.name),
                'Artist'
            );
        });

        it('should throw an error when the artist does not exist', () => {
            assertErrorType(
                () => artistManager.deleteArtistByName(artist.name),
                'Artist'
            );
        });
    });
});

function assertErrorType(failFunction, typeError) {
    try {
        failFunction();
    }
    catch (error) {
        assert.equal(typeError, error.getType());
    }
}