const AddArtistHandler = require('./command/handlers/addArtistHandler');
const DeleteArtistHandler = require('./command/handlers/deleteArtistHandler');
const AddAlbumHandler = require ('./command/handlers/addAlbumHandler');
const AddTrackHandler = require ('./command/handlers/AddTrackHandler');
const SearchSongsByArtistHandler = require ('./command/handlers/searchSongsByArtistHandler');
const ShowAllArtistsHandler = require ('./command/handlers/showAllArtistsHandler');
const ShowAllArtistAlbumHandler = require ('./command/handlers/showAllArtistAlbumHandler');

class HandlersCreator{
    static getHandlers(){
        let addArtistHandler = new AddArtistHandler();
        let deleteArtistHandler = new DeleteArtistHandler();
        let addAlbumHandler = new AddAlbumHandler();
        let addTrackHandler= new AddTrackHandler();
        let searchSongsByArtistHandler = new SearchSongsByArtistHandler();
        let showAllArtistsHandler = new ShowAllArtistsHandler();

        let handlers = [];
        handlers.push(addArtistHandler);
        handlers.push(deleteArtistHandler);
        handlers.push(addAlbumHandler);
        handlers.push(addTrackHandler);
        handlers.push(searchSongsByArtistHandler);
        handlers.push(showAllArtistsHandler);

        return handlers;
    }
}

module.exports = HandlersCreator;