class ConsoleService {
    constructor(parsedArgs){
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