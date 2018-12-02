const loggingEndpoint = require('../services/endpoints').LOGGINGURL;

class LoggingService{
    
    notifyNewAlbum(album, artist){
        const options = {
            url: loggingEndpoint,
            body: {
                text: `Se ha agregado a ${artist} el album ${album}`
            },
            json: true
        };
        return rp.post(options)
        .then( () => { console.log("Mande la notificacion")} )
        .catch(() => { console.log("No mande nada")})
    }

}

module.exports= LoggingService;