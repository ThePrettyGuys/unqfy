class Validator {
    constructor(data) {
        this.data = data;
    }

    isValid(){
        let hasData = Boolean(this.data);
        let hasCompleteData = Boolean((this.data || {}).name) && Boolean((this.data || {}).country);
        return hasData && hasCompleteData;
    }
}

module.exports = Validator;