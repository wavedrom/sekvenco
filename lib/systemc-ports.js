'use strict';

const sctype = width => {
  const w = Math.abs(width);
  return (w === 1)
    ? 'bool'
    : 'sc_' + ((w > 64) ? 'big' : '') + 'uint<' + w + '> ';
};

const systemcPorts = (porto) => {
  const signaloj = [];
  Object.keys(porto).map(name => {
    const w = porto[name];
    const dir = 'sc_' + ((w > 0) ? 'in' : 'out');
    signaloj.push('    ' + dir + '<' + sctype(w) + '> ' + name + ';');
  });
  return signaloj;
};

module.exports = systemcPorts;
