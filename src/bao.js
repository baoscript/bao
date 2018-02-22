const evalWithContext = function(context, expr) {
  return function() {
    with (this) {
      return eval(expr);
    }
  }.call(context);
}

class Variable {
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
      this.val_ = evalWithContext(context.getVarContext(), val['expr']);
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
  constructor() {
    this.vars_ = new Map();
    this.steps_ = new Map();
  }

  /**
   * Get the step. Create one if it doesn't exist.
   * @param {string} name 
   */
  getStep(name) {
    if (!this.steps_.has(name)) {
      this.steps_.set(name, new BaoStep(this, name));
    }
    return this.steps_.get(name);
  }

  /**
   * Set the step with JSON data.
   * @param {string} name 
   * @param {object} stepJson 
   */
  setStep(name, stepJson) {
    this.getStep(name).parseJsonData(stepJson);
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
   * Get variable
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

class BaoStep {
  constructor(context, name = '') {
    // Context
    this.context_ = context;

    // Step name
    this.name_ = name;

    // console.log
    this.print_ = undefined;

    // Init while entering, another step.
    this.init_ = null;

    // Next steps.
    this.nextSteps_ = new Map();

    this.condition_ = null;
    this.then_ = null;
    this.else_ = null;

    // Goto
    this.goto_ = null;

    // Setters of this step
    this.set_ = new Map();
  }

  /**
   * Register click handler for next steps.
   * @param {string} action 
   * @param {BaoStep} next 
   */
  registerButton(action, next) {
    $('[data-bao-action="' + action + '"]').prop('disabled', false);
    $('[data-bao-action="' + action + '"]').click([this.context_, next], function(e) {
      const context = e.data[0];
      context.sync();
      const next = e.data[1];
      next.run();
    });
  }
  
  /** Get step name. */
  getName() {
    return this.name_;
  }

  /**
   * Initialize step with JSON data.
   * @param {object} data 
   */
  parseJsonData(data) {
    if (data) {
      // Set step name.
      this.name_ = data['name'];
      // Set init step
      if (data['init']) {
        // Anonymous step
        this.init_ = new BaoStep(this.context_);
        this.init_.parseJsonData(data['init']);
      }
      // print, literal only
      if (data['print'] !== undefined) {
        this.print_ = data['print'];
      }
      if (data['decl']) {
        for (const varName of data['decl']) {
          // Vars decl
          this.context_.maybeDeclareVar(varName);
        }
      }
      // Set setlist
      for (const varName in data['set']) {
        this.set_.set(varName, data['set'][varName]);
      }

      // At most one of next, goto and case.

      // Set goto
      if (data['goto']) {
        // goto must be a string
        this.goto_ = this.context_.getStep(data['goto']);
      }
      // Next, register buttons
      if (data['next']) {
        for (const action in data['next']) {
          const next = new BaoStep(this.context_);
          next.parseJsonData(data['next'][action]);
          this.nextSteps_.set(action, next);
        }
      }

      // if clause.
      if (data['if']) {
        this.condition_ = data['if']['condition'];
        this.then_ = new BaoStep(this.context_);
        this.then_.parseJsonData(data['if']['then']);
        if (data['if']['else']) {
          this.else_ = new BaoStep(this.context_);
          this.else_.parseJsonData(data['if']['else']);
        }
      }
    }
  }

  /** 
   * Run the setter step.
   * @private
   */
  setVars_() {
    for (const [name, val] of this.set_) {
      this.context_.setVar(name, val);
    }
  }

  /** Run the step. */
  run() {
    // Remove all registered click handlers first.
    $('[data-bao-action]').off('click').prop('disabled', true);

    if (this.name_) {
      console.log('Current step: ' + this.name_);
    }

    // Run init
    if (this.init_) {
      this.init_.run();
    }
    if (this.set_) {
      this.setVars_();
    }
    if (this.print_ != undefined) {
      console.log(this.print_);
    }

    // Register click handler.
    for (const [action, next] of this.nextSteps_) {
      this.registerButton(action, next);
    }

    if (this.condition_) {
      if (evalWithContext(this.context_.getVarContext(), this.condition_)) {
        return this.then_.run();
      }
      if (this.else_) {
        return this.else_.run();
      }
    }

    return this.goto_ && this.goto_.run();
  }

}

class Bao {
  constructor() {
    this.context_ = new Context();
  }

  /** Initialize bao with JSON data. */
  parseString(json) {
    const data = JSON.parse(json);
    for (const stepJson of data) {
      this.context_.setStep(stepJson['name'], stepJson);
    }
  }

  /** Start bao flow. */
  run() {
    const current = this.context_.getStep('#begin');
    current.run();
  }
}

// Export Bao
window['Bao'] = Bao;
