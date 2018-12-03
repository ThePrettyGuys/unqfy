const EmailService = require('../services/emailService');
const LoggingService = require ('../services/loggingService');
let observers = [new EmailService, new LoggingService]

class AlbumObserver {
    constructor() {

    }

    notify(album, artist, action) {
        switch(action){
            case "new":
                    observers.forEach( observer => observer.notifyNewAlbum(album,artist));
                    break;
            case "delete":
                    observers.forEach( observer => observer.notifyDeleteAlbum(album,artist));
                    break;
        }
    }
}

module.exports = AlbumObserver;