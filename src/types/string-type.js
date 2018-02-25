const Variable = require('./base-type');

class StringVariable extends Variable {
  /**
   * Create a string variable.
   * @param {string} name 
   */
  constructor(name) {
    super(name, 'string');
  }

  /**
   * @param {string} str
   * @override
   */
  parseString(str) {
    return str;
  }
}

module.exports = StringVariable;
