const rp = require('request-promise');
const notifyEndpoint = 'http://localhost:5000/api/notify';

class EmailService{

    notifyNewAlbum(album,artist){
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
        console.log("Pase por send de email Service")
        return rp.post(options)
        .then( () => { console.log("Mande la notificacion")} )
        .catch(() => { console.log("No mande nada")})
    }
}


module.exports = EmailService;