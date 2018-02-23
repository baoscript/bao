const $ = require('jquery');
const context = require('./context.js');
const Context = context.Context;

/** A base class for a step abstraction in bao. */
class BaoStep {
  constructor(context) {
    // Type of the step. One of BaoStep, IfStep, GotoStep, ActionStep.
    this.type_ = 'BaoStep';
    // Context
    this.context_ = context;
    // Step name
    this.name_ = undefined;
    // console.log
    this.print_ = undefined;
    // Init while entering, another step.
    this.init_ = undefined;
    // Setters of this step
    this.set_ = new Map();
  }

  /**
   * A factory method to create bao steps with correct subclasses.
   * @param {Context} context
   * @param {object} data
   * @return {BaoStep}
   */
  static create(context, data) {
    if (data['if']) {
      const ifStep = new IfStep(context);
      ifStep.parseJsonData(data);
      return ifStep;
    }
    if (data['goto']) {
      const gotoStep = new GotoStep(context);
      gotoStep.parseJsonData(data);
      return gotoStep;
    }
    if (data['next']) {
      const actionStep = new ActionStep(context);
      actionStep.parseJsonData(data);
      return actionStep;
    }
    const step = new BaoStep(context);
    step.parseJsonData(data);
    return step;
  }

  /** Get step type. */
  getType() {
    return this.type_;
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
      // Set init step.
      if (data['init']) {
        // Anonymous step.
        this.init_ = BaoStep.create(this.context_, data['init']);
      }
      // print, literal only.
      if (data['print'] !== undefined) {
        this.print_ = data['print'];
      }
      if (data['decl']) {
        for (const varName of data['decl']) {
          // Vars decl.
          this.context_.maybeDeclareVar(varName);
        }
      }
      // Set setlist.
      if (data['set'])
      for (const varName in data['set']) {
        this.set_.set(varName, data['set'][varName]);
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
    console.log('Current step: ' + this.name_ + ' (' + this.getType() + ')');
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
    return null;
  }

}

/** A step that contains if clause. */
class IfStep extends BaoStep {
  constructor(context, name) {
    super(context, name);

    this.type_ = 'IfStep';
    this.condition_ = undefined;
    this.thenStep_ = undefined;
    this.elseStep_ = undefined;
  }

  /**
   * Parse an IfStep.
   * @param {object} data 
   * @override
   */
  parseJsonData(data) {
    super.parseJsonData(data);
    if (!data['if'] || !data['if']['condition'] || !data['if']['then']) {
      throw 'Invalid if step';
    }
    this.condition_ = data['if']['condition'];
    this.thenStep_ = BaoStep.create(this.context_, data['if']['then']);
    // Optional else clause.
    if (data['if']['else']) {
      this.elseStep_ = BaoStep.create(this.context_, data['if']['else']);
    }
  }

  /**
   * If step implementation.
   * @override
   */
  run() {
    super.run();
    if (!this.condition_ || !this.thenStep_) {
      throw 'Invalid if step';
    }
    if (context.evalWithContext(this.context_, this.condition_)) {
      return this.thenStep_.run();
    }
    if (this.elseStep_) {
      return this.elseStep_.run();
    }
    return null;
  }
}

/** A step that contains goto clause. */
class GotoStep extends BaoStep {
  constructor(context, name) {
    super(context, name);

    this.type_ = 'GotoStep';
    // The **name** of goto step.
    this.goto_ = undefined;
  }

  /**
   * Parse an GotoStep。
   * @param {object} data 
   * @override
   */
  parseJsonData(data) {
    super.parseJsonData(data);
    if (!data['goto']) {
      throw 'Invalid goto step';
    }
    this.goto_ = data['goto'];
  }

  /**
   * Goto step implementation.
   * @override
   */
  run() {
    super.run();
    if (!this.goto_ || !this.context_.getStep(this.goto_)) {
      throw 'Invalid goto step';
    }
    return this.context_.getStep(this.goto_).run();
  }
}

/** A step that waits on UI click actions. */
class ActionStep extends BaoStep {
  constructor(context, name) {
    super(context, name);

    this.type_ = 'ActionStep';
    // Next steps.
    this.nextSteps_ = new Map();
  }

  /**
   * Parse an ActionStep。
   * @param {object} data 
   * @override
   */
  parseJsonData(data) {
    super.parseJsonData(data);
    if (!data['next']) {
      throw 'Invalid action step';
    }
    if (data['next']) {
      for (const action in data['next']) {
        // Create an anonymous step.
        const next = BaoStep.create(this.context_, data['next'][action]);
        this.nextSteps_.set(action, next);
      }
    }
  }

  /**
   * Action step implementation.
   * @override
   */
  run() {
    super.run();
    // Register click handler.
    for (const [action, next] of this.nextSteps_) {
      this.registerButton_(action, next);
    }
    return null;
  }

  /**
   * Register click handler for next steps.
   * @param {string} action 
   * @param {BaoStep} next 
   * @private
   */
  registerButton_(action, next) {
    $('[data-bao-action="' + action + '"]').prop('disabled', false);
    $('[data-bao-action="' + action + '"]').click([this.context_, next], function(e) {
      const context = e.data[0];
      context.sync();
      const next = e.data[1];
      next.run();
    });
  }
}

module.exports = {
  // Export factory.
  createBaoStep: BaoStep.create
};
