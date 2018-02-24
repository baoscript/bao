const $ = require('jquery');
const baoContext = require('../context');
const Context = baoContext.Context;
const BaoStep = require('./base-step');

/** A step that contains switch clause. */
class SwitchStep extends BaoStep {
  constructor(context) {
    super(context);

    this.type_ = 'SwitchStep';
    this.expr_ = undefined;
    this.cases_ = new Map();
    this.defaultStep_ = undefined;
  }

  /**
   * Parse a SwitchStep.
   * @param {object} data 
   * @override
   */
  parseJsonData(data) {
    super.parseJsonData(data);
    if (!data['switch'] || !data['switch']['expr'] || !data['switch']['cases']) {
      throw 'Invalid switch step';
    }
    this.expr_ = data['switch']['expr'];
    for (const [val, clause] of data['switch']['cases']) {
      this.cases_.set(val, this.baoStepFactory_(this.context_, clause));
    }

    // Optional default clause.
    if (data['switch']['default']) {
      this.defaultStep_ = this.baoStepFactory_(this.context_, data['switch']['default']);
    }
  }

  /**
   * Switch step implementation.
   * @override
   */
  run() {
    super.run();
    if (!this.expr_ || !this.cases_) {
      throw 'Invalid switch step';
    }
    const exprVal = baoContext.evalWithContext(this.context_, this.expr_);
    const clause = this.cases_.get(exprVal);
    if (clause) {
      return clause.run();
    }
    if (this.defaultStep_) {
      return this.defaultStep_.run();
    }
    return null;
  }
}

module.exports = SwitchStep;
