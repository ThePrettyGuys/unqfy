const notifyEndpoint = 'http://localhost:5000/api/notify';
const rp = require('request-promise');

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
        return rp.post(options)
        .then( () => { console.log("Mande el email")} )
        .catch(() => { console.log("No mande el email")})
    }

    notifyDeleteAlbum(album,artist){
        return
    }
}


module.exports = EmailService;