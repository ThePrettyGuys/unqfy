class Playlist{
    constructor(id, aName, includingGenres, maxDuration){
        this.id = id;
        this.name = aName;
        this.genres = includingGenres;
        this.maxDuration = maxDuration;
        this.tracks = [];
    }

    sameId(anId){
        return this.id === anId;
    }

    addTrack(aTrack){
        this.tracks.push(aTrack);
    }

    containsInName(aWord){
        return this.name.contains(aWord);
    }
}

module.exports = Album;