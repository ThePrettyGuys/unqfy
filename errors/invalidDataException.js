class InvalidDataException extends Error {
    constructor(command, data, message='') {
        super(message);
        this.command = command;
        this.data = data;
    }

    log(){
        let detail = 'No se ingresaron parámetros válidos.';
        console.log('exception ' + Object.keys(this.data));
        let hasKeys = Boolean(Object.keys(this.data));

        if(hasKeys){
            let entries = Object.entries(this.data);
            let toShow =[];
            entries.forEach(entry => this.addBuildedEntry(toShow, entry));
            toShow.concat();
            detail = `Los datos son incorrectos: ${toShow}`;
        }
        console.log(`No se pudo completar la operación: ${this.command}. ${detail}`);
    }

    addBuildedEntry(toShow, entry) {
        return toShow.push(entry[0] + ':' + entry[1]);
    }
}

module.exports = InvalidDataException;