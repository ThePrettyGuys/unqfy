const parsedArgs = require('yargs')
    .option('genres', {
        type: 'array',
        desc: 'One or more genres for tracks or playlists'
    })
    .argv;

class ConsoleService {
    constructor(){
        this.parsedParameters = parsedArgs;
    }

    command(){
        return this.parsedParameters._[0];
    }

    getObjectByArgs() {
        Object.assign(this.parsedParameters, { $0: undefined, _: undefined });
        return this.parsedParameters;
    }

    existCommand() {
        return Boolean(this.parsedParameters);
    }
}

module.exports = ConsoleService;