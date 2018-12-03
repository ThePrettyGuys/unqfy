const notifyEndpoint = require('../services/endpoints').NOTIFY_ENDPOINT;
const email_from = require('../../config/config').email_from;
const rp = require('request-promise');

class EmailService{
    notifyNewAlbum(album,artist){
        const options = {
            url: notifyEndpoint,
            body: {
                artistId: `${artist.id}`,
                from: email_from,
                subject: `Nuevo album de ${artist.name}`,
                message: `Se agregó el album ${album.name} de ${artist.name}`
            },
            json: true
        };
        return rp.post(options)
        .then( () => { console.log("Mande el email")} )
        .catch(() => { console.log("No mande el email")})
    }

    notifyDeleteAlbum(album,artist){
        return
    }
}


module.exports = EmailService;