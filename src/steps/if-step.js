const Context = require('../context');
const BaoStep = require('./base-step');

/** A step that contains if clause. */
class IfStep extends BaoStep {
  constructor(context) {
    super(context);

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
    this.thenStep_ = this.baoStepFactory_(this.context_, data['if']['then']);
    // Optional else clause.
    if (data['if']['else']) {
      this.elseStep_ = this.baoStepFactory_(this.context_, data['if']['else']);
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
    if (this.context_.eval(this.condition_)) {
      return this.thenStep_.run();
    }
    if (this.elseStep_) {
      return this.elseStep_.run();
    }
    return null;
  }
}

module.exports = IfStep;
