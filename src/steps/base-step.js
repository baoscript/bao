const $ = require('jquery');
const Context = require('../context');

/** A base class for a step abstraction in bao. */
class BaoStep {
  constructor(context) {
    // Type of the step. One of BaoStep, IfStep, GotoStep, ActionStep and SwitchStep.
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
    // BaoStep factory.
    this.baoStepFactory_ = context.getBaoStepFactory();
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
        this.init_ = this.baoStepFactory_(this.context_, data['init']);
      }
      // print, literal only.
      if (data['print'] !== undefined) {
        this.print_ = data['print'];
      }
      if (data['decl']) {
        for (const varName in data['decl']) {
          // Vars decl.
          this.context_.maybeDeclareVar(varName, data['decl'][varName]);
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

module.exports = BaoStep;
