const flatMap = require('array.prototype.flatmap');

class Artist{
    constructor(id, aName, aCountry){
        this.id = id;
        this.name = aName;
        this.country = aCountry;
        this.albums = [];
    }

    getAllAlbums(){
        return this.albums;
    }

    addAlbum(anAlbum){
        this.albums.push(anAlbum);
    }

    getAlbumByName(anAlbumName){
        return this.albums.find(this.isTheAlbum(anAlbumName));
    }

    deleteAlbum(anAlbumName){
        let indexToDelete= this.albums.findIndex(this.isTheAlbum(anAlbumName));
        if(indexToDelete >= 0){
            this.albums.splice(indexToDelete,1);
            return true;
        } else {
            return false;
        }
    }

    isTheAlbum(anAlbumName){
        return x => x.name === anAlbumName;
    }

    sameId(anId){
        return this.id === anId;
    }

    sameName(aName){
        return this.name === aName;
    }

    containsInName(aWord){
        return this.name.includes(aWord);
    }

    getTracks(){
        return flatMap(this.albums, anAlbum => anAlbum.tracks);
    }
}

module.exports = Artist;