class InvalidDataException extends Error {
    constructor(command, data, message='') {
        super(message);
        this.command = command;
        this.data = data;
    }

    messageDetail(){
        let detail = 'No se ingresaron parámetros válidos.';
        let hasKeys = Boolean(Object.keys(this.data));

        if(hasKeys){
            let entries = Object.entries(this.data);
            let toShow =[];
            entries.forEach(entry => this.addBuildedEntry(toShow, entry));
            toShow.concat();
            detail = `Los datos son incorrectos: ${toShow}`;
        }
        return `No se pudo completar la operación: ${this.command}. ${detail}`;
    }

    addBuildedEntry(toShow, entry) {
        return toShow.push(entry[0] + ':' + entry[1]);
    }
}

module.exports = InvalidDataException;