const $ = require('jquery');
const Variable = require('./types/base-type');
const NumberVariable = require('./types/number-type');
const StringVariable = require('./types/string-type');
const BooleanVariable = require('./types/boolean-type');
/**
 * A factory to create a variable with name and type.
 * @param {string} name 
 * @param {string} type one of number, string and boolean.
 * @return {Variable}
 */
function createVariable(name, type) {
  switch (type) {
    case 'number':
      return new NumberVariable(name);
    case 'string':
      return new StringVariable(name);
    case 'boolean':
      return new BoolVariable(name);
    default:
      throw 'Unsupported type ' + type;
  }
}

module.exports = {
  createVariable: createVariable
};
