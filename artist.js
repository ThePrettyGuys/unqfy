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
}

module.exports = Artist;