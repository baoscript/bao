const $ = require('jquery');

class Variable {
  /**
   * Create a variable with name and type.
   * @param {string} name 
   * @param {string} type one of number, string and boolean.
   */
  constructor(name, type) {
    this.name_ = name;
    this.val_ = undefined;
    this.type_ = type;
    this.updateDomElements_();
  }

  /**
   * Set the value of this variable.
   * @param {anything} val
   */
  setVal(val) {
    if (typeof val !== this.type_) {
      throw 'Invalid ' + this.type_ + ' ' + val;
    }
    this.val_ = val;
    this.updateDomElements_();
  }

  /**
   * Get the value of variable.
   */
  getVal() {
    return this.val_;
  }

  /** 
   * Update the value of the linked DOM element with this variable.
   * @private
   */
  updateDomElements_() {
    $('[data-bao-target="' + this.name_ + '"]').val(this.val_);
  }

  /**
   * Update the value with the linked DOM element.
   */
  sync() {
    const val = $('[data-bao-target="' + this.name_ + '"]').val();
    this.val_ = this.parseString(val);
  }

  /**
   * Converts string to the type.
   * A base method to be implemented by subclasses.
   * @param {string} str 
   */
  parseString(str) {}
}

module.exports = Variable;