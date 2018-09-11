class Handler {
    constructor(command) {
        this.command = command;
     }

    handle(unqfy,data){
        throw ("Método no definido!");
    }
}

module.exports = Handler;