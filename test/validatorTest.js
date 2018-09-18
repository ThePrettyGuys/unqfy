/* eslint-env node, mocha */

const assert = require('chai').assert;
const Validator = require('../errors/validator');

describe('Validator', () => {
    let validProperties = ['name', 'country'];

    describe('when validate with valid data', () =>{
        let dataToValidate = {name: 'Marcos', country:'Argentina'};
        let validator = Validator;
        it('is true', () => {
            assert.isTrue(validator.isValid(validProperties, dataToValidate));
        });
    });

    describe('when validate with invalid data', () =>{
        let dataToValidate = {name: 'Marcos'};
        let validator = Validator;
        it('is false', () => {
            assert.isFalse(validator.isValid(validProperties,dataToValidate));
        });
    });
});

function getEntry(toShow, entry) {
    return toShow.push(entry[0] + ':' + entry[1]);
}