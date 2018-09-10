/* eslint-env node, mocha */

const assert = require('chai').assert;
const Validator = require('../errors/validator');

describe('Validator', () => {
    let validProperties = ['name', 'country'];

    describe('when validate with valid data', () =>{
        let dataToValidate = {name: 'Marcos', country:'Argentina'};
        let validator = new Validator(dataToValidate);
        it('is true', () => {
            assert.isTrue(validator.isValidFor(validProperties));
        });
    });

    describe('when validate with invalid data', () =>{
        let dataToValidate = {name: 'Marcos'};
        let validator = new Validator(dataToValidate);
        it('is false', () => {
            assert.isFalse(validator.isValidFor(validProperties));
        });
    });
});

function getEntry(toShow, entry) {
    return toShow.push(entry[0] + ':' + entry[1]);
}