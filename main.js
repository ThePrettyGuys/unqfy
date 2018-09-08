const fs = require('fs'); // necesitado para guardar/cargar unqfy
const unqmod = require('./unqfy'); // importamos el modulo unqfy
const CommandSelector = require('./command/commandSelector');
const HandlersCreator = require('./command/handlersCreator');
const ConsoleService = require('./consoleService');

/**
 * Retorna una instancia de UNQfy. Si existe filename, recupera la instancia desde el archivo.
 */

function getUNQfy(filename = 'data.json') {
    let unqfy = new unqmod.UNQfy();
    if (fs.existsSync(filename)) {
        unqfy = unqmod.UNQfy.load(filename);
    }
    return unqfy;
}

function saveUNQfy(unqfy, filename = 'data.json') {
    unqfy.save(filename);
}

/**El comando se debe ingresar de la forma:
 *  > node main.js command parametro1="valor" parametro2="valor"
 *  Donde `command` es el comando que se quiere ejecutar.
 *  parametro1, parametro2, parametroN, se deben escribir junto al signo `=` y junto a su valor, sin espacios intermedios.
 *  Estos parametros pasaron a ser las key del objectData que se formará.
 */
function main() {
    console.log('UNQfy está corriendo..');
    let handlersToRegister = HandlersCreator.getHandlers();
    let commandSelector = new CommandSelector(handlersToRegister);

    let unqfy = getUNQfy();
    
    if(ConsoleService.existCommand()){
        let command = ConsoleService.command();
        let objectByParameters = ConsoleService.getObjectByArgs();
        let commandHandler = commandSelector.findHandler(command);

        if(commandHandler){
            commandHandler.handle(unqfy, objectByParameters);

            saveUNQfy(unqfy);
        }else{
            console.log('No se encontró un handler para el comando: ' + command);
        }
    }else {
        console.log('Ingrese un comando!');
    }
}

main();