class NotFoundException implements Error {
    constructor(type) {
        this.type = type;
    }

    getType(){
        return this.type;
    }
}

module.exports = NotFoundException;

// , `No se pudo completar la operación. No existe un artista de nombre: ${albumData.artistName}`