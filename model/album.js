class Album{
    constructor(id, aName, aYear){
        this.id = id;
        this.name = aName;
        this.year = aYear;
        this.tracks = [];
    }

    sameId(anId){
        return this.id === anId;
    }

    addTrack(aTrack){
        this.tracks.push(aTrack);
    }

    containsInName(aWord){
        return this.name.includes(aWord);
    }

    sameName(aName){
        return this.name === aName;
    }
}

module.exports = Album;