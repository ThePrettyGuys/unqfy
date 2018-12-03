const loggingEndpoint = require('../services/endpoints').LOGGINGURL;
const rp = require('request-promise');

class LoggingService{
    
    notifyNewAlbum(album, artist){
        const options = {
            url: loggingEndpoint,
            body: {
                text: `Se ha agregado a ${artist.name} el album ${album.name}`
            },
            json: true
        };
        return rp.post(options)
        .then( () => { console.log("Nuevo Album logueado")} )
        .catch(() => { console.log("Nuevo album no logueado")})
    }

    notifyNewArtist(artist){
        const options = {
            url: loggingEndpoint,
            body: {
                text: `Alta nuevo artista: ${artist.name}`
            },
            json: true
        };
        return rp.post(options)
        .then( () => { console.log("Nuevo artista logueado")} )
        .catch(() => { console.log("Nuevo artista no logueado")})
    }

    notifyNewTrack(track, artist){
        const options = {
            url: loggingEndpoint,
            body: {
                text: `Alta nuevo track: ${track.name} de ${artist.name}`
            },
            json: true
        };
        return rp.post(options)
        .then( () => { console.log("Nuevo track logueado")} )
        .catch(() => { console.log("Nuevo track no logueado")})
    }

    notifyDeleteArtist(artist){
        const options = {
            url: loggingEndpoint,
            body: {
                text: `Eliminacion de artista: ${artist.name}`
            },
            json: true
        };
        return rp.post(options)
        .then( () => { console.log("Eliminacion de artista logueado")} )
        .catch(() => { console.log("Eliminacion de artista no logueado")})
    }

}

module.exports= LoggingService;