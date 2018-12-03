const LoggingService = require ('../services/loggingService');
let observers = [new LoggingService]

class TrackObserver {
    constructor() {

    }

    notify(track, artist) {
        console.log("Pase por el trackObserver");
        observers.forEach( observer => {
            observer.notifyNewTrack(track, artist);
        });
    }
}

module.exports = TrackObserver;