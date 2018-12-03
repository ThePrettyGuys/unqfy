const LoggingService = require ('../services/loggingService');
let observers = [new LoggingService];

class ArtistObserver {
    constructor() {

    }

    notify(artist) {
        observers.forEach( observer => {
            observer.notifyNewArtist(artist);
        });
    }
}

module.exports = ArtistObserver;