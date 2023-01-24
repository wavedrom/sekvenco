'use strict';

const traverse = require('./traverse.js');

const systemcSteps = (wd, porto, clockName, comment) => {
  const steps = [];
  traverse(wd, sig => {
    const { name, wave, data } = sig;
    if (!name || !wave || !(porto[name] < 0)) {
      return;
    }
    const cs = wave.split('');
    for (let idx = 0; idx < cs.length; idx++) {
      const c = cs[idx];
      let val;
      switch(c) {
      case '0': val = 0; break;
      case '1': val = 1; break;
      case '=': val = data; break;
      }
      const step = steps[idx] = (steps[idx] || {kind: 'posedge', clock: clockName, body: []});
      if (val !== undefined) {
        step.body.push({kind: 'assign', lhs: name, rhs: val});
      }
    }
  });
  return {kind: 'block', body: steps, comment};
};

module.exports = systemcSteps;
