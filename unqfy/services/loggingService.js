const loggingEndpoint = require('../services/endpoints').LOGGINGURL;
const rp = require('request-promise');

class LoggingService{
    
    notifyNewAlbum(album, artist){
        const text = `Se ha agregado a ${artist.name} el album ${album.name}`;
        return this.notify(text, 'Nuevo album');
    }

    notifyNewArtist(artist){
        const text = `Artista agregado con nombre: ${artist.name}, y country: ${artist.country}`;
        return this.notify(text, 'Nuevo artista');
    }

    notifyNewTrack(track, artist){
        const text = `Alta nuevo track: ${track.name} de ${artist.name}`;
        return this.notify(text, 'Nuevo track');
    }

    notifyDeleteArtist(artist){
        const text = `Se eliminó el artista de nombre: ${artist.name}`;
        return this.notify(text, 'Eliminacion de artista');
    }

    notifyDeleteAlbum(album, artist){
        const text = `Se ha eliminado de ${artist.name} el album ${album.name}`;
        return this.notify(text, 'Eliminacion de album');
    }

    notifyDeleteTrack(track, artist){
        const text = `Se ha eliminado el track: ${track.name} de: ${artist.name}`;
        return this.notify(text, 'Eliminacion de track');

    }

    notify(text, onSuccessOrReject) {
        const successMessage = onSuccessOrReject + ' logueado en el canal de slack #grupo1-notifications.';
        const rejectMessage = onSuccessOrReject + ' no logueado.';
        const options = {
            url: loggingEndpoint,
            body: {
                text: text
            },
            json: true
        };
        return rp.post(options)
            .then(() => { console.log(successMessage); })
            .catch(() => { console.log(rejectMessage); });
    }
}

module.exports= LoggingService;