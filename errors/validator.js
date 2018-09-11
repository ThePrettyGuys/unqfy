class Validator {

    constructor(){
     if(! Validator.instance){
       Validator.instance = this;
     }
     return Validator.instance;
    }
  
    isValid(properties, data){
        let hasData = Boolean(data);
        return hasData && properties.every(property => this.existProperty(property,data));
    }

    existProperty(property, data){
        // Reflect.get(this.data, property);
        return Boolean((data || {})[property]);
    }
  
  }
  
  const validator = new Validator();
  Object.freeze(validator);
  
 module.exports= validator;
  