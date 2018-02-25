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
   * @param {string} str e.g. '43.250', '250', 43e250', '0b1101', '0x1f',
   *                          'NaN', 'Infinity'
   * @override
   */
  parseString(str) {
    if (str === 'NaN') {
      return NaN;
    }
    val = Number(str);
    // Unable to parse.
    if (isNaN(val)) {
      throw 'Invalid number ' + str;
    }
    return val;
  }
}

module.exports = NumberVariable;
