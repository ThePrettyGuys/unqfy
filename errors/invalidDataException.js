class InvalidDataException implements Error {
    constructor(command, data) {
        this.command = command;
        this.data = data;
    }

    log(){
        console.log(`No se pudo completar la operación: ${this.command}. Los datos son incorrectos: ${(data || {}).name} ${(data || {}).country} `);
    }
}

module.exports = InvalidDataException;