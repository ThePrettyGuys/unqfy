const LoggingService = require ('../services/loggingService');
let observers = [new LoggingService]

class TrackObserver {
    constructor() {

    }

    notify(track, artist, action) {

        switch(action){
            case "new":
                    observers.forEach( observer => observer.notifyNewTrack(track, artist) );
                    break;
            case "delete":
                    observers.forEach( observer => observer.notifyDeleteTrack(track, artist));
                    break;
        }
    }
}

module.exports = TrackObserver;