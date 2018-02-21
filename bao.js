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

  setVal(val, context) {
    // We only eval {'expr': ''} here. We treat it as literal otherwise.
    if (typeof val === 'object' && val['expr']) {
      this.val_ = evalWithContext(context.getVarContext(), val['expr']);
    } else {
      this.val_ = val;
    }
    this.updateDomElements_();
  }

  getVal() {
    return this.val_;
  }

  updateDomElements_() {
    const el = $('[data-bao-target="' + this.name_ + '"]');
    el.val(this.val_);
  }

  // Retrive values from dom elements
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

  // Create a new step if it doesn't exist, otherwise get from map.
  getStep(name) {
    if (!this.steps_.has(name)) {
      this.steps_.set(name, new BaoStep(this, name));
    }
    return this.steps_.get(name);
  }

  setStep(name, stepJson) {
    this.getStep(name).parseJsonData(stepJson);
  }

  maybeDeclareVar(name) {
    if (!this.hasVar(name)) {
      this.vars_.set(name, new Variable(name));
    }
  }

  getVar(name) {
    return this.vars_.get(name);
  }

  setVar(name, val) {
    this.maybeDeclareVar(name);
    this.vars_.get(name).setVal(val, this);
  }

  hasVar(name) {
    return this.vars_.has(name);
  }

  getVarContext() {
    const varContext = {};
    for (const [name, val] of this.vars_) {
      varContext[name] = val.getVal();
    }
    return varContext;
  }

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

    this.condition_ = null;
    this.then_ = null;
    this.else_ = null;

    // Goto
    this.goto_ = null;

    // Setters of this step
    this.set_ = new Map();
  }

  registerButton() {
    $('button[data-bao-action="sync"]').click(this.context_, function(e) {
      const context = e.data;
      context.sync();
    });
  }

  getName() {
    return this.name_;
  }

  // Parse JSON formatted data.
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
          $('button[data-bao-action="' + action + '"]').click([this.context_, next], function(e) {
            const context = e.data[0];
            context.sync();
            const next = e.data[1];
            next.run();
          });
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

  // "set"
  setVars_() {
    for (const [name, val] of this.set_) {
      this.context_.setVar(name, val);
    }
  }

  run() {
    // Run init
    if (this.name_) {
      console.log('Current step: ' + this.name_);
    }

    if (this.init_) {
      this.init_.run();
    }
    if (this.set_) {
      this.setVars_();
    }
    if (this.print_ != undefined) {
      console.log(this.print_);
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

  parseString(json) {
    const data = JSON.parse(json);
    for (const stepJson of data) {
      this.context_.setStep(stepJson['name'], stepJson);
    }
  }

  run() {
    const current = this.context_.getStep('#begin');
    current.run();
  }
}

// Export Bao
window['Bao'] = Bao;
