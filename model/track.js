class Track {
    constructor(id, aName, aDuration, genres, artistName) {
        this.id = id;
        this.name = aName;
        this.duration = aDuration;
        this.genres = genres;
        this.artistName = artistName
    }

    sameId(anId) {
        return this.id === anId;
    }

    containsInName(aWord){
        return this.name.includes(aWord);
    }

    belongsToSomeGenres(aGenres){
        return aGenres.some(genreToFind => this.belongsToGenre(genreToFind));
    }

    belongsToGenre(aGenre){
        return (this.genres || []).includes(aGenre);
    }

    toJSON(){
        return {name: this.name, duration: this.duration, genres: this.genres};
    }
}

module.exports = Track;