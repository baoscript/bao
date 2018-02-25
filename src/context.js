const Variable = require('./variable');

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
      this.vars_.set(name, Variable.createVariable(name, type));
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
      this.setVar(name, this.eval(val['expr']));
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

  /**
   * Return a js object with mapping of variable name to value.
   * @private
   */
  getVarContext_() {
    const varContext = {};
    for (const [name, val] of this.vars_) {
      varContext[name] = val.getVal();
    }
    return varContext;
  }
  /**
   * Eval an expression in this context.
   * @param {string} expr 
   */
  eval(expr) {
    return (new Function('with(this){return ' + expr + '}')).call(this.getVarContext_());
  };

  /** Update all variables with DOM elements. */
  sync() {
    for (const [name, val] of this.vars_) {
      val.sync();
    }
  }
}

module.exports = Context;
