const AddArtistHandler = require('./handlers/addArtistHandler');
const DeleteArtistHandler = require('./handlers/deleteArtistHandler');
const AddAlbumHandler = require ('./handlers/addAlbumHandler');
const AddTrackHandler = require ('./handlers/addTrackHandler');
const SearchSongsByArtistHandler = require ('./handlers/searchSongsByArtistHandler');
const ShowAllArtistsHandler = require ('./handlers/showAllArtistsHandler');
const ShowAllArtistAlbumHandler = require ('./handlers/showAllArtistAlbumHandler');
const ShowAlbumTracksHandler = require ('./handlers/showAlbumTracksHandler');
const ShowPartialSearchHandler = require ('./handlers/showPartialSearchHandler');
const CreatePlaylistHandler = require ('./handlers/createPlaylistHandler');
const SearchSongsByGenreHandler= require ('./handlers/searchSongsByGenreHandler');

class HandlersCreator{
    static getHandlers(){
        let addArtistHandler = new AddArtistHandler();
        let deleteArtistHandler = new DeleteArtistHandler();
        let addAlbumHandler = new AddAlbumHandler();
        let addTrackHandler= new AddTrackHandler();
        let searchSongsByArtistHandler = new SearchSongsByArtistHandler();
        let showAllArtistsHandler = new ShowAllArtistsHandler();
        let showAllArtistAlbumHandler = new ShowAllArtistAlbumHandler();
        let showAlbumTracksHandler = new ShowAlbumTracksHandler();
        let showPartialSearchHandler = new ShowPartialSearchHandler();
        let createPlaylistHandler = new CreatePlaylistHandler();
        let searchSongsByGenreHandler = new SearchSongsByGenreHandler();

        let handlers = [];
        handlers.push(addArtistHandler);
        handlers.push(deleteArtistHandler);
        handlers.push(addAlbumHandler);
        handlers.push(addTrackHandler);
        handlers.push(searchSongsByArtistHandler);
        handlers.push(showAllArtistsHandler);
        handlers.push(showAllArtistAlbumHandler);
        handlers.push(showAlbumTracksHandler);
        handlers.push(showPartialSearchHandler);
        handlers.push(createPlaylistHandler);
        handlers.push(searchSongsByGenreHandler);

        return handlers;
    }
}

module.exports = HandlersCreator;