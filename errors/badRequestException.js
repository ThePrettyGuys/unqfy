class BadRequestException extends Error {
    constructor(type=400, keyToFind='BAD_REQUEST', message='') {
        super(message);
        this.type = type;
        this.keyToFind = keyToFind;
    }
}

module.exports = BadRequestException;