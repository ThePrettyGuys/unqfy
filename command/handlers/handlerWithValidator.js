const InvalidDataException = require('../../errors/invalidDataException');
const Validator = require('../../errors/validator');
const Handler =  require('../handlers/handler');

class HandlerWithValidator extends Handler {
    constructor(command, minimumProperties) {
        super(command);
        this.minimumProperties= minimumProperties;
        this.validator = Validator;
     }

     validate(data){
        if(!this.validator.isValid(this.minimumProperties, data)){
            throw new InvalidDataException(this.command, data)
        }
    }
}

module.exports = HandlerWithValidator;