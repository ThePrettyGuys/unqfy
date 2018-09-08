const fs = require('fs'); // necesitado para guardar/cargar unqfy
const unqmod = require('./unqfy'); // importamos el modulo unqfy
const parsedArgs = require('yargs').argv;
const CommandSelector = require('./command/commandSelector');
const HandlersCreator = require('./command/handlersCreator');

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

/*
 En esta funcion deberán interpretar los argumentos pasado por linea de comandos
 e implementar los diferentes comandos.

  Se deberán implementar los comandos:
    -/ Alta y baja de Artista HECHO
    - Alta y Baja de Albums  HECHO ALTA. **************Falta baja*****************
    - Alta y Baja de tracks HECHO ALTA   **************Falta baja*****************

    -/ Listar todos los Artistas  HECHO.
    - Listar todos los albumes de un artista  
    - Listar todos los tracks de un album

    -/ Busqueda de canciones intepretadas por un determinado artista HECHO.
    - Busqueda de canciones por genero

    - Dado un string, imprimmir todas las entidades (artistas, albums, tracks, playlists) que coincidan parcialmente
    con el string pasado.

    - Dada un nombre de playlist, una lista de generos y una duración máxima, crear una playlist que contenga
    tracks que tengan canciones con esos generos y que tenga como duración máxima la pasada por parámetro.

  La implementacion de los comandos deberá ser de la forma:
   1. Obtener argumentos de linea de comando
   2. Obtener instancia de UNQfy (getUNQFy)
   3. Ejecutar el comando correspondiente en Unqfy
   4. Guardar el estado de UNQfy (saveUNQfy)

*/

function deleteUnnusedKeys() {
    Object.assign(parsedArgs, { $0: undefined, _: undefined });
    return parsedArgs;
}

/**
 * En esta función se deben registrar los handlers necesarios para cada comando disponible.
 *
 */

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
    
    let command = parsedArgs._[0];

    if(command){
        let objectByParameters = deleteUnnusedKeys();
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