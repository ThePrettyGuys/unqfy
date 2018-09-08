class DeleteArtistHandler {
    constructor() {
        this.command = 'DeleteArtist';
    }

    canHandle(aCommand) {
        return this.command === aCommand;
    }

    handle(unqfy, artistData) {
        let successfull;

        if(artistData.name){
            console.log(`Se va a eliminar al artista de nombre: ${artistData.name} `);
            successfull = unqfy.deleteArtistByName(artistData.name);
        }

        if(artistData.id){
            console.log(`Se va a eliminar al artista de id: ${artistData.id} `);
            successfull = unqfy.deleteArtistById(artistData.id);
        }

        if(!artistData.name && !artistData.id){
            console.log('Parámetro inválido. Se debe enviar el nombre o id del artista a enviar.');
        }

        if(successfull){
            console.log('Artista eliminado.');
        }else{
            console.log('No hay datos para eliminar.');
        }

        return unqfy;
    }
}

module.exports = DeleteArtistHandler;