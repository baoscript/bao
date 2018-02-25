const Variable = require('./base-type');

class NumberVariable extends Variable {
  /**
   * Create a number variable.
   * @param {string} name 
   */
  constructor(name) {
    super(name, 'number');
  }

  /**
   * Convert string to number.
   * @param {string} str
   * @override
   */
  parseString(str) {
    val = Number(str);
    if (isNaN(val)) {
      throw 'Invalid number ' + str;
    }
    return val;
  }
}

module.exports = NumberVariable;
