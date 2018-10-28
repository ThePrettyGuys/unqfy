const CommandSelector = require('./command/commandSelector');
const HandlersCreator = require('./command/handlersCreator');
const ConsoleService = require('./unqfy/services/consoleService');
const UnqfyProgram = require('./unqfy/unqfyProgram');
const UnqfyFileSystem = require('./unqfy/unqfyFileSystem');
const UnqfyRepository = require('./unqfy/repositorys/unqfyRepository');
const config = require('./config/config');
const parsedArgs = configureParameterAsArray();

function configureParameterAsArray() {
    let parameterToConfigure = 'genres';
    return require('yargs')
        .option(parameterToConfigure, {
            type: 'array',
            desc: 'One or more genres for tracks or playlists'
        })
        .argv;
}

function main() {
    console.log('UNQfy está ejecutando..');

    let handlersToRegister = HandlersCreator.getHandlers();
    let commandSelector = new CommandSelector(handlersToRegister);
    let consoleService = new ConsoleService(parsedArgs);
    let unqfyRepository = new UnqfyRepository();
    let unqfyFileSystem = new UnqfyFileSystem(unqfyRepository);
    let unquify = new UnqfyProgram(commandSelector, consoleService, unqfyFileSystem);

    unquify.playConsole(config.FILENAME);
}

main();