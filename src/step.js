const Context = require('./context');
const BaseStep = require('./steps/base-step');
const IfStep = require('./steps/if-step');
const SwitchStep = require('./steps/switch-step');
const GotoStep = require('./steps/goto-step');
const ActionStep = require('./steps/action-step');

/**
 * A factory method to create bao steps with appropriate subclasses.
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
