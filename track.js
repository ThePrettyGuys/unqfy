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
        return this.name.includes(aWord);
    }

    belongsToSomeGenres(aGenres){
        return aGenres.some(genreToFind => this.belongsToGenre(genreToFind));
    }

    belongsToGenre(aGenre){
        return this.genres.includes(aGenre);
    }
}

module.exports = Track;