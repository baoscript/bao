const $ = require('jquery');
const BaoStep = require('./step.js');
const Context = require('./context.js').Context;

class Bao {
  constructor() {
    this.context_ = new Context(BaoStep.create);
  }

  /** Initialize bao with JSON data. */
  parseString(json) {
    const data = JSON.parse(json);
    for (const stepJson of data) {
      this.context_.setStep(stepJson['name'], stepJson);
    }
  }

  /** Start bao flow. */
  run() {
    const current = this.context_.getStep('#begin');
    current.run();
  }
}

module.exports = Bao;
