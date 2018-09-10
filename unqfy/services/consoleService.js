class ConsoleService {
    constructor(parsedArgs){
        this.parsedParameters = parsedArgs;
    }

    command(){
        return this.parsedParameters._[0];
    }

    getObjectByArgs() {
        let toReturn = {};
        Object.assign(toReturn, this.parsedParameters);
        delete toReturn.$0;
        delete toReturn._;

        return toReturn;
    }

    existCommand() {
        return Boolean(this.command());
    }
}

module.exports = ConsoleService;