
const InvalidDataException = require('../../errors/invalidDataException');
const Validator = require('../../errors/validator');

class Handler{
    constructor(command, minimumProperties) {
        this.command = command;
        this.validator = new Validator(minimumProperties);
     }

     validate(data){
        if(!this.validator.isValid(data)){
            throw new InvalidDataException(this.command, data)
        }
    }
}

module.exports = Handler;