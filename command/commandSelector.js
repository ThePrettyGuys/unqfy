class CommandSelector {
    constructor(aHandlers) {
        this.handlers = aHandlers;
    }

    findHandler(command) {
        return this.handlers.find(aHandler => aHandler.canHandle(command));
    }
}

module.exports = CommandSelector;