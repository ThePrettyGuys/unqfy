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

    addTrackIfNotIsFull(aTrack){
        if(this.canAdd(aTrack)){
            this.tracks.push(aTrack);
        }
    }

    canAdd(atrack) {
        return atrack.duration <= (this.availableDuration());
    }

    availableDuration() {
        return this.maxDuration - this.duration();
    }

    containsInName(aWord){
        return this.name.includes(aWord);
    }

    duration(){
        return this.tracks.reduce((totalDuration, aTrack) =>  totalDuration + aTrack.duration, 0);
    }

    hasTrack(aTrack){
        return this.tracks.includes(aTrack);
    }

    isFull(){
        return this.maxDuration === this.duration();
    }
}

module.exports = Playlist;