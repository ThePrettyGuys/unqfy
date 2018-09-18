/* eslint-env node, mocha */

const assert = require('chai').assert;
const CommandSelector = require('../command/commandSelector');
const HandlersCreator = require('../command/handlersCreator');

describe('CommandSelector create with all handlers', () => {
    let handlersToRegister = HandlersCreator.getHandlers();
    let commandSelector = new CommandSelector(handlersToRegister);

    describe('#findHandler', () => {
        describe('with valid command received', ()=>{
            let commandsCandidatesToReceive = ['AddArtist', 'AddAlbum', 'AddTrack', 'DeleteArtist', 'SearchSongsFrom',
                'SearchSongsByGenre', 'ShowAlbumTracks', 'ShowAllArtists', 'FindInAll', 'ShowAllArtistAlbum',
            'DeleteAlbum', 'DeleteArtist', 'DeleteTrack'];

            commandsCandidatesToReceive.forEach(commandReceived => {
                it(`should be ${commandReceived}`, () => {
                    const handler = commandSelector.findHandler(commandReceived);
                    assert.equal(commandReceived, handler.command);
                    assert.equal(handlersToRegister.length, commandsCandidatesToReceive.length);
                });
            })
        });

        describe('with invalid command received', ()=>{
            let commandReceived = 'Invalid';

            it('should be undefined', () => {
                const handler = commandSelector.findHandler(commandReceived);
                assert.isUndefined(handler);
            });
        });
    })
});