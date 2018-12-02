const rp = require('request-promise');
const notifyEndpoint = 'http://localhost:5000/api/notify';
class AlbumObserver {
    constructor() {
        this.observers = [];
    }

    notify(album, artist) {
        const options = {
            url: notifyEndpoint,
            body: {
                artistId: `${artist.id}`,
                from: 'carlos.j.perez1974@gmail.com',
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