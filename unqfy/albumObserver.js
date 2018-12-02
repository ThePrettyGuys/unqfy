const EmailService = require('./services/emailService');
const LoggingService = require ('./services/loggingService');

class AlbumObserver {
    constructor() {
        this.observers = [];
        this.observers.push(new EmailService);
        this.observers.push(new LoggingService);
    }

    notify(album, artist) {
        this.observers.forEach( observer => {
            observer.notifyNewAlbum(album,artist);
        });
    }
}

module.exports = AlbumObserver;