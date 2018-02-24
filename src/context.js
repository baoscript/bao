const $ = require('jquery');

/**
 * Eval an expression with context.
 * @param {Context} context 
 * @param {string} expr 
 */
const evalWithContext = function(context, expr) {
  return (new Function('with(this){return ' + expr + '}')).call(context.getVarContext());
};

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
    const el = $('[data-bao-target="' + this.name_ + '"]');
    el.val(this.val_);
  }

  /**
   * Update the value with the linked DOM element.
   */
  sync() {
    const val = $('[data-bao-target="' + this.name_ + '"]').val();
    switch (this.type_) {
      case 'number':
        this.val_ = Number(val);
        if (isNaN(this.val_)) {
          throw 'Invalid number ' + val;
        }
        break;
      case 'string':
        this.val_ = val;
        break;
      case 'boolean':
        switch (val) {
          case 1:
          case 'true':
            this.val_ = true;
            break;
          case 0:
          case 'false':
            this.val_ = false;
            break;
          default:
            throw 'A boolean value must be either true or false (' + val + ')';
        }
        break;
      default:
        throw 'Unsupported variable type';
    }
  }
}

class Context {
  /**
   * Create Bao context.
   * @param {function} baoStepFactory factory function to create BaoStep.
   */
  constructor(baoStepFactory) {
    this.baoStepFactory_ = baoStepFactory;
    this.vars_ = new Map();
    this.steps_ = new Map();
  }

  /** @return {function} BaoStep factory. */
  getBaoStepFactory() {
    return this.baoStepFactory_;
  }

  /**
   * Get step by name.
   * @param {string} name 
   */
  getStep(name) {
    return this.steps_.get(name);
  }

  /**
   * Set the step with JSON data.
   * @param {string} name 
   * @param {BaoStep} baoStep 
   */
  setStep(name, baoStep) {
    this.steps_.set(name, baoStep);
  }

  /**
   * Declare a variable if it doesn't exist.
   * @param {string} name 
   * @param {string} type
   */
  maybeDeclareVar(name, type) {
    if (!this.hasVar(name)) {
      this.vars_.set(name, new Variable(name, type));
    }
  }

  /**
   * Get variable by name.
   * @param {string} name 
   * @return {Variable}
   */
  getVar(name) {
    return this.vars_.get(name);
  }

  /**
   * Set value of the variable. Declare one if it doesn't exist with the type of val.
   * It takes either a literal or an expression object, e.g. {'expr': 'a+b'}.
   * @param {string} name 
   * @param {string|object} val 
   */
  setVar(name, val) {
    // We only eval expr here.
    if (typeof val === 'object' && val['expr']) {
      this.setVar(name, evalWithContext(this, val['expr']));
    } else {
      // Deduce the type.
      this.maybeDeclareVar(name, typeof val);
      this.vars_.get(name).setVal(val);
    }
  }

  /**
   * Tell if a variable has been declared.
   * @param {string} name 
   */
  hasVar(name) {
    return this.vars_.has(name);
  }

  /** Return a js object with mapping of variable name to value. */
  getVarContext() {
    const varContext = {};
    for (const [name, val] of this.vars_) {
      varContext[name] = val.getVal();
    }
    return varContext;
  }

  /** Update all variables with DOM elements. */
  sync() {
    for (const [name, val] of this.vars_) {
      val.sync();
    }
  }
}

module.exports = {
  // Export class Context.
  Context: Context,
  // Export eval.
  evalWithContext: evalWithContext
};
