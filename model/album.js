const NotFoundException = require('../errors/notFoundException');

class Album{
    constructor(id, aName, aYear){
        this.id = id;
        this.name = aName;
        this.year = aYear;
        this.tracks = [];
    }

    getTracks(){
        return this.tracks;
    }

    addTrack(aTrack){
        this.tracks.push(aTrack);
    }

    deleteTrack(nameTrack){
        let indexToDelete= this.tracks.findIndex(this.isTheTrack(nameTrack));
        let deletedTrack= this.tracks[indexToDelete];
        if(indexToDelete >= 0){
            this.tracks.splice(indexToDelete,1);
            return deletedTrack;
        } else {
            throw new NotFoundException('Track', nameTrack);
        }
    }

    isTheTrack(aTrackName){
        return x => x.name === aTrackName;
    }

    containsInName(aWord){
        return this.name.toLowerCase().includes(aWord.toLowerCase());
    }

    sameName(aName){
        return this.name === aName;
    }

    sameId(anId){
        return this.id === anId;
    }
}

module.exports = Album;