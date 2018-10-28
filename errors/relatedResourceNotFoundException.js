class RelatedResourceNotFoundException extends Error {
    constructor(type=404, keyToFind='RELATED_RESOURCE_NOT_FOUND', message='') {
        super(message);
        this.type = type;
        this.keyToFind = keyToFind;
    }
}

module.exports = RelatedResourceNotFoundException;