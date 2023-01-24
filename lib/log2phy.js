'use strict';

const traverse = require('./traverse.js');

const log2phy = (wd, portMap) => {
  const wdRes = wd;
  const fixNameFn = sig => {
    if (sig.name && portMap[sig.name]) {
      sig.name = portMap[sig.name];
    }
  };
  traverse(wd, fixNameFn);
  return wdRes;
};

module.exports = log2phy;
