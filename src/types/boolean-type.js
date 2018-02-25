const Variable = require('./base-type');

class BooleanVariable extends Variable {
  /**
   * Create a boolean variable.
   * @param {string} name 
   */
  constructor(name) {
    super(name, 'boolean');
  }

  /**
   * Convert '0', '1', 'true', 'false' to boolean.
   * @param {string} str
   * @override
   */
  parseString(str) {
    switch (str) {
      case '1':
      case 'true':
        return true;
      case '0':
      case 'false':
        return false;
      default:
        throw 'A boolean value must be either true or false (' + str + ')';
    }
  }
}

module.exports = BooleanVariable;
