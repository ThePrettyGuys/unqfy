class Validator {
    constructor(properties) {
        this.properties = properties;
    }

    isValid(data){
        let hasData = Boolean(data);
        return hasData && this.properties.every(property => this.existProperty(property,data));
    }

    existProperty(property, data){
        // Reflect.get(this.data, property);
        return Boolean((data || {})[property]);
    }
}

module.exports = Validator;