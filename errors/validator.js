class Validator {
    constructor(data) {
        this.data = data;
    }

    isValidFor(properties){
        let hasData = Boolean(this.data);
        return hasData && properties.every(property => this.existProperty(property));
    }

    existProperty(property){
        // Reflect.get(this.data, property);
        return Boolean((this.data || {})[property]);
    }
}

module.exports = Validator;