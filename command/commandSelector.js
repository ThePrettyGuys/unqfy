class CommandSelector {
    constructor() {
        this.handlers = [];
    }

    findHandler(command) {
        return this.handlers.find(aHandler => aHandler.canHandle(command));
    }

    addHandler(aHandler) {
        this.handlers.push(aHandler);
    }
}

module.exports = CommandSelector;