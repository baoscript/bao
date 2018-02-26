const FlowChart = require('./flowchart.js/flowchart.chart');
const Start = require('./flowchart.js/flowchart.symbol.start');
const End = require('./flowchart.js/flowchart.symbol.end');
const Operation = require('./flowchart.js/flowchart.symbol.operation');
const InputOutput = require('./flowchart.js/flowchart.symbol.inputoutput');
const Subroutine = require('./flowchart.js/flowchart.symbol.subroutine');
const Condition = require('./flowchart.js/flowchart.symbol.condition');

class BaoViz {
  constructor(container) {
    this.flowchart_ = new FlowChart(container);
  }

  addStep(step) {

  }


  render() {
    const begin = {
      key: '#begin',
      symbolType: 'start',
      text: 'Begin'
    };
    const step1 = {
      key: 'Step1',
      symbolType: 'operation',
      text: 'Step1'
    };
    const end = {
      key: '#end',
      symbolType: 'end',
      text: 'End'
    };
    const cond = {
      key: 'if',
      symbolType: 'condition',
      text: 'sddr == zusf',
      'yes-text': 'sddr',
      'no-text': 'bmiao',
    };
    begin.next = step1;
    step1.next = end;
    cond.yes = end;
    cond.no = step1;

    const beginStep = new Start(this.flowchart_, begin);
    const endStep = new End(this.flowchart_, end)
    const step = new Operation(this.flowchart_, step1);
    const condStep = new Condition(this.flowchart_, cond);

    // const step2 = new Operation(this.flowchart_);
    this.flowchart_.startWith(beginStep);
    beginStep.then(step);
    step.then(condStep);
    condStep.yes(endStep);
    condStep.no(step);
    this.flowchart_.render();
    
  }

  drawStep() {
    
  }
}

module.exports = BaoViz;
