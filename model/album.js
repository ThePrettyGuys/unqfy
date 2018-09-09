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

    getTracks(){
        return this.tracks;
    }

    addTrack(aTrack){
        this.tracks.push(aTrack);
    }

    deleteTrack(nameTrack){
        let indexToDelete= this.tracks.findIndex(this.isTheTrack(anAlbumName));
        if(indexToDelete >= 0){
            this.tracks.splice(indexToDelete,1);
            return true;
        } else {
            return false;
        }
    }

    isTheTrack(aTrackName){
        return x => x.name === aTrackName;
    }

    containsInName(aWord){
        return this.name.includes(aWord);
    }

    sameName(aName){
        return this.name === aName;
    }
}

module.exports = Album;