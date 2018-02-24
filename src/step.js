const $ = require('jquery');
const Context = require('./context').Context;
const BaseStep = require('./step/base-step');
const IfStep = require('./step/if-step');
const SwitchStep = require('./step/switch-step');
const GotoStep = require('./step/goto-step');
const ActionStep = require('./step/action-step');

/**
 * A factory method to create bao steps with correct subclasses.
 * @param {Context} context
 * @param {object} data
 * @return {BaoStep}
 */
function createBaoStep(context, data) {
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
  if (data['switch']) {
    const switchStep = new SwitchStep(context);
    switchStep.parseJsonData(data);
    return switchStep;
  }
  const step = new BaseStep(context);
  step.parseJsonData(data);
  return step;
}

module.exports = {
  // Export factory.
  createBaoStep: createBaoStep
};
