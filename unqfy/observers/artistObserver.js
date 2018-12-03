const LoggingService = require ('../services/loggingService');
let observers = [new LoggingService];

class ArtistObserver {
    constructor() {
    }

    notify(artist, action) {
        switch(action){
            case "new":
                    observers.forEach( observer => observer.notifyNewArtist(artist) );
                    break;
            case "delete":
                    observers.forEach( observer => observer.notifyDeleteArtist(artist));
                    break;
        }

    }
}

module.exports = ArtistObserver;