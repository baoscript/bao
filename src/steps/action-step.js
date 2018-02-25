const $ = require('jquery');
const Context = require('../context');
const BaoStep = require('./base-step');

/** A step that waits on UI click actions. */
class ActionStep extends BaoStep {
  constructor(context) {
    super(context);

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
        const next = this.baoStepFactory_(this.context_, data['next'][action]);
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
      $('[data-bao-action="' + action + '"]')
          .prop('disabled', false)
          .click([this.context_, next], function(e) {
            const context = e.data[0];
            context.sync();
            const next = e.data[1];
            next.run();
          });
    }
    return null;
  }
}

module.exports = ActionStep;
