const notifyEndpoint = require('../services/endpoints').NOTIFY_ENDPOINT;
const email_from = require('../../config/config').email_from;
const rp = require('request-promise');

class EmailService {
    notifyNewAlbum(album, artist) {
        const subject = `Nuevo album de ${artist.name}`;
        const message = `Se agregó el album ${album.name} de ${artist.name}`;

        return this.notificar(artist, album, subject, message);
    }

    notifyDeleteAlbum(album, artist) {
        const subject = `Albúm eliminado de ${artist.name}`;
        const message = `Se elimino el album ${album.name}, del artista: ${artist.name}`;

        return this.notificar(artist, album, subject, message);
    }

    notificar(artist, album, subject, message, onfulfilled = () => {
        console.log('Mail Enviado');
    }, onrejected = () => {
        console.log('No se envió el mail');
    }) {
        const options = {
            url: notifyEndpoint,
            body: {
                artistId: `${artist.id}`,
                from: email_from,
                subject: subject,
                message: message
            },
            json: true
        };
        return rp.post(options)
            .then(onfulfilled)
            .catch(onrejected);
    }
}


module.exports = EmailService;