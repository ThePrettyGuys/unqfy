class Playlist{
    constructor(id, aName, includingGenres, maxDuration){
        this.id = id;
        this.name = aName;
        this.genres = includingGenres;
        this.maxDuration = maxDuration;
        this.tracks = [];
    }

    sameName(aName){
        return this.name === aName;
    }

    addTrackIfCan(aTrack){
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

    deleteTracks(trackstoDelete){
        let indexsOfTracksToDelete = this.indexsOfTracks(trackstoDelete);
        this.deleteTracksFrom(indexsOfTracksToDelete);
    }

    indexsOfTracks(trackstoDelete) {
        return trackstoDelete.map(aTrack => this.getIndexOfTrack(aTrack));
    }

    getIndexOfTrack(aTrack) {
        return this.tracks.indexOf(aTrack);
    }

    deleteTracksFrom(indexsOfTracksToDelete) {
        indexsOfTracksToDelete.forEach(aTrackPosition => this.deleteTrackInPosition(aTrackPosition));
    }

    deleteTrackInPosition(indexOfTrack) {
        if (indexOfTrack > -1) {
            this.tracks.splice(indexOfTrack, 1);
        }
    }
}

module.exports = Playlist;