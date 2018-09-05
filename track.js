class Track {
    constructor(id, aName, aDuration, genres) {
        this.id = id;
        this.name = aName;
        this.duration = aDuration;
        this.genres = genres;
    }

    sameId(anId) {
        return this.id === anId;
    }

    containsInName(aWord){
        return this.name.contains(aWord);
    }
}

module.exports = Track;