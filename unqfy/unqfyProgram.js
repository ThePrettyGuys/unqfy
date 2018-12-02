const InvalidDataException = require('../errors/invalidDataException');
const NotFoundException = require('../errors/notFoundException');

class UnqfyProgram {
    constructor(commandSelector, consoleService, unqfyFileSystem) {
        this.commandSelector = commandSelector;
        this.consoleService = consoleService;
        this.unqfyFileSystem = unqfyFileSystem;
    }

    playConsole(fileName){
        let unqfy = this.unqfyFileSystem.getUNQfy(fileName);

        if(!this.consoleService.existCommand()){
            console.log('Ingrese un comando!');
        }

        let command = this.consoleService.command();
        let objectByParameters = this.consoleService.getObjectByArgs();
        let commandHandler = this.commandSelector.findHandler(command);

        if(Boolean(commandHandler)){
            try{
                commandHandler.handle(unqfy, objectByParameters);
                this.unqfyFileSystem.saveUNQfy(unqfy, fileName);
            } catch (error) {
                if (error instanceof InvalidDataException) {
                    console.log(error.messageDetail());
                }
                if (error instanceof NotFoundException) {
                    console.log(error.messageDetail());
                } else {
                    console.log(error);
                }
            }
        }else {
            console.log(`No se encontró un handler para el comando: ${command}`);

        }
    }
}

module.exports = UnqfyProgram;