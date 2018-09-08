const parsedArgs = require('yargs')
    .option('genres', {
        type: 'array',
        desc: 'One or more genres for tracks or playlists'
    })
    .argv;

class ConsoleService {
    static command(){
        return parsedArgs._[0];
    }

    static getObjectByArgs() {
        Object.assign(parsedArgs, { $0: undefined, _: undefined });
        return parsedArgs;
    }

    static existCommand() {
        return Boolean(this.command());
    }
}

module.exports = ConsoleService;