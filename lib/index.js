'use strict';

const pkg = require('../package.json');
const interpret = require('./interpret.js');
const log2phy = require('./log2phy.js');
const traverse = require('./traverse.js');
const systemcPorts = require('./systemc-ports.js');
const systemcSteps = require('./systemc-steps.js');
const systemcEmiter = require('./systemc-emiter.js');

exports.version = pkg.version;
exports.interpret = interpret;
exports.log2phy = log2phy;
exports.traverse = traverse;
exports.systemc = {
  ports: systemcPorts,
  steps: systemcSteps,
  emitter: systemcEmiter
};
