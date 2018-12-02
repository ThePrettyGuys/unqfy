const EmailService = require('./services/emailService');
const LoggingService = require ('./services/loggingService');
let observers = [new EmailService, new LoggingService]

class AlbumObserver {
    constructor() {

    }

    notify(album, artist) {
        observers.forEach( observer => {
            observer.notifyNewAlbum(album,artist);
        });
    }
}

module.exports = AlbumObserver;