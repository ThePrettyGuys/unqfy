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
        .then( () => { console.log("Logueado")} )
        .catch(() => { console.log("No logueado")})
    }

}

module.exports= LoggingService;