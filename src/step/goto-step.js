const $ = require('jquery');
const Context = require('../context').Context;
const BaoStep = require('./base-step');

/** A step that contains goto clause. */
class GotoStep extends BaoStep {
  constructor(context) {
    super(context);

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

module.exports =  GotoStep;
