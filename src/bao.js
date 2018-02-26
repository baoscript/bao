const BaoStep = require('./step');
const Context = require('./context');
const BaoViz = require('./flowchart/bao-viz');

class Bao {
  constructor() {
    this.context_ = new Context(BaoStep.createBaoStep);
  }

  /** Initialize bao with JSON data. */
  parseString(json) {
    const data = JSON.parse(json);
    for (const stepJson of data) {
      this.context_.setStep(stepJson['name'],
                            BaoStep.createBaoStep(this.context_, stepJson));
    }
    return this;
  }

  /** Start bao flow. */
  run() {
    const current = this.context_.getStep('#begin');
    current.run();
  }
}


function baoViz(container) {
  const viz = new BaoViz(container);
  viz.render();
}

// Only exports bao runner.
module.exports = {
  runBao: function(json) {
    new Bao().parseString(json).run();
  },
  baoViz: baoViz
};
