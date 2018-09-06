const flatMap = require('array.prototype.flatmap');

class Artist{
    constructor(id, aName, aCountry){
        this.id = id;
        this.name = aName;
        this.country = aCountry;
        this.albums = [];
    }

    addAlbum(anAlbum){
        this.albums.push(anAlbum);
    }

    sameId(anId){
        return this.id === anId;
    }

    containsInName(aWord){
        return this.name.includes(aWord);
    }

    getTracks(){
        return flatMap(this.albums, anAlbum => anAlbum.tracks);
    }
}

module.exports = Artist;