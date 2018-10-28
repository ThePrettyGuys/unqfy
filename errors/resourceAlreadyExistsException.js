class ResourceAlreadyExistsException extends Error {
    constructor(type=409, keyToFind='RESOURCE_ALREADY_EXISTS', message='') {
        super(message);
        this.type = type;
        this.keyToFind = keyToFind;
    }
}

module.exports = ResourceAlreadyExistsException;