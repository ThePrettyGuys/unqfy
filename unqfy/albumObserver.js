const rp = require('request-promise');
const NOTIFY_ENDPOINT = require('./services/endpoints').NOTIFY_ENDPOINT;
const email_from = require('../config/config').email_from;

class AlbumObserver {
    constructor() {
        this.observers = [];
    }

    notify(album, artist) {
        const options = {
            url: NOTIFY_ENDPOINT,
            body: {
                artistId: `${artist.id}`,
                from: email_from,
                subject: `Nuevo album de ${artist.name}`,
                message: `Se agregó el album ${album.name} de ${artist.name}`
            },
            json: true
        };
        return rp.post(options)
        .then( () => { return res.status(200).json() } )
        .catch(() => res.status(404).json({status: 404, errorCode: "RELATED_RESOURCE_NOT_FOUND"}))
    }
}

module.exports = AlbumObserver;