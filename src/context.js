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
   * Create a variable with name.
   * @param {string} name 
   */
  constructor(name) {
    this.name_ = name;
    this.val_ = null;
    this.updateDomElements_();
  }

  /**
   * Set the value of variable. It takes either a literal or
   * an expression object, e.g. {'expr': 'a+b'}.
   * @param {string|object} val 
   * @param {Context} context 
   */
  setVal(val, context) {
    // We only eval expression here.
    if (typeof val === 'object' && val['expr']) {
      this.val_ = evalWithContext(context, val['expr']);
    } else {
      this.val_ = val;
    }
    this.updateDomElements_();
  }

  /**
   * Get the value of variable.
   */
  getVal() {
    return this.val_;
  }

  /** 
   * Update the value of corresponding DOM element with this variable.
   * @private
   */
  updateDomElements_() {
    const el = $('[data-bao-target="' + this.name_ + '"]');
    el.val(this.val_);
  }

  /**
   * Update the value with corresponding DOM element.
   */
  sync() {
    const el = $('[data-bao-target="' + this.name_ + '"]');
    try {
      // Try to parse types, otherwise treat as a string literal.
      this.val_ = eval(el.val());
    } catch (e) {
      this.val_ = el.val();
    }
  }
}

class Context {
  /**
   * Create Bao context.
   */
  constructor() {
    this.vars_ = new Map();
    this.steps_ = new Map();
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
   */
  maybeDeclareVar(name) {
    if (!this.hasVar(name)) {
      this.vars_.set(name, new Variable(name));
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
   * Set value of the variable. Declare one if it doesn't exist.
   * @param {string} name 
   * @param {string|object} val 
   */
  setVar(name, val) {
    this.maybeDeclareVar(name);
    this.vars_.get(name).setVal(val, this);
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
