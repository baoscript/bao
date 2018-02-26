const Variable = require('./base-type');

class ArrayVariable extends Variable {
  /**
   * Create an array variable.
   * @param {string} name
   */
  constructor(name) {
    super(name, 'array');
  }

  /**
   * Convert string to array.
   * @param {string} str e.g. '[1,2,3]', '["1","2"]', '[[1,2],[3,4]]'
   * @override
   */
  parseString(str) {
    const arr = JSON.parse(str);
    if (!Array.isArray(arr)) {
      throw 'Invalid array ' + str;
    }
    return arr;
  }  
  /**
   * Convert array to json string.
   * @override
   */
  toString() {
    return this.val_ && JSON.stringify(this.val_);
  }
}

module.exports = ArrayVariable;
