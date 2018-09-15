class NotFoundException extends Error {
    constructor(type, keyToFind, message='') {
        super(message);
        this.type = type;
        this.keyToFind = keyToFind;
    }

    getType(){
        return this.type;
    }

    messageDetail(){
        let message  = `No se encontró de tipo: ${this.getType()}, para: ${this.keyToFind}`;
        return message;
    }
}

module.exports = NotFoundException;

// , `No se pudo completar la operación. No existe un artista de nombre: ${albumData.artistName}`