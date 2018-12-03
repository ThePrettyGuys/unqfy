const flatMap = require('array.prototype.flatmap');
const NotFoundException = require('../errors/notFoundException');
const ResourceAlreadyExistsException = require('../errors/resourceAlreadyExistsException');
const AlbumObserver = require('../unqfy/observers/albumObserver');
const ArtistObserver = require('../unqfy/observers/artistObserver');
const TrackObserver = require('../unqfy/observers/trackObserver');

class Artist{
    constructor(id, aName, aCountry){
        this.id = id;
        this.name = aName;
        this.country = aCountry;
        this.albums = [];
        this.albumsObserver = new AlbumObserver();
        this.artistObserver= new ArtistObserver();
        this.trackObserver= new TrackObserver();
    }

    getAllAlbums(){
        return this.albums;
    }

    getAlbumByName(anAlbumName){
        return this.albums.find(album => album.sameName(anAlbumName));
    }

    getTracks(){
        return flatMap(this.albums, anAlbum => anAlbum.tracks);
    }

    addTrackToAlbum(albumName, trackData){
        let album = this.getAlbumByName(albumName);
        if(!Boolean(album)){
            throw new NotFoundException('Album', albumName);
        }
        return album.addTrack(trackData);
    }

    notifyNewAlbum(album){
        this.albumsObserver.notify(album, this, "new");
    }

    notifyDeleteAlbum(album){
        this.albumsObserver.notify(album, this, "delete");
    }

    notifyNewArtist(){
        this.artistObserver.notify(artist, "new");
    }
    
    notifyDeleteArtist(){
        this.artistObserver.notify(this, "delete");
    }

    notifyNewTrack(track,artist){
        this.trackObserver.notify(track, artist, "new");
    }

    notifyDeleteTrack(track, artist){
        this.trackObserver.notify(track, artist, "delete");
    }

    addAlbum(anAlbum){
        if(this.getAlbumByName(anAlbum.name)){
            //throw new ResourceAlreadyExistsException();
        } else {
            this.albums.push(anAlbum);
        }
    }

    deleteAlbum(anAlbumName){
        let albumtoDelete = this.getAlbumByName(anAlbumName);
        let tracksFromDeletedAlbum = albumtoDelete.getTracks();
        let indexToDelete = this.getIndexOfAlbum(albumtoDelete);
        this.deleteAlbumInPosition(indexToDelete);
        return tracksFromDeletedAlbum;
    }

    deleteTrackFromAlbum(albumName, trackName){
        let album = this.getAlbumByName(albumName);
        if(!Boolean(album)){
            throw new NotFoundException('Album', albumName);
        }
        return album.deleteTrack(trackName);
    }

    deleteAlbumIfItExists(albumId){
        let indexToDelete= this.albums.findIndex(this.isTheAlbum(albumId));
        let deletedAlbum= this.albums[indexToDelete];
        if(indexToDelete >= 0){
            this.albums.splice(indexToDelete,1);
            this.notifyDeleteAlbum(deletedAlbum);
            return deletedAlbum;
    }
    }

    deleteAlbumInPosition(indexOfAlbum) {
        if (indexOfAlbum > -1) {
            this.albums.splice(indexOfAlbum, 1);
        }
    }

    getIndexOfAlbum(anAlbum) {
        return this.albums.indexOf(anAlbum);
    }

    isTheAlbum(albumId){
        return x => x.sameId(albumId);
    }

    sameName(aName){
        return this.name === aName;
    }

    sameId(anId){
        return this.id == anId;
    }

    containsInName(aWord){
        return this.name.toLowerCase().includes(aWord.toLowerCase());
    }
}

module.exports = Artist;