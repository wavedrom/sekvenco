'use strict';

const { expect } = require('chai');

const lib = require('../lib');

const clock1 = {
  signal: [
    {name: 'clock', wave: 'p....'}
  ]
};

describe('basic', () => {
  it('version', () => {
    expect(lib.version).to.be.a('string');
  });

  it('interpret', () => {
    expect(lib.interpret).to.be.a('function');
  });

  it('create interpreter', () => {
    expect(lib.interpret('{}')).to.be.a('function');
  });

  it('interpret empty object', () => {
    const interpreter = lib.interpret('{}');
    expect(interpreter()).to.be.an('object');
  });

  it('interpret clock string', () => {
    const interpreter = lib.interpret(`
{
  "signal": [
    {name: 'clock', wave: 'p....'}
  ]
}
`);
    expect(interpreter()).to.deep.eq(clock1);
  });

  it('interpret clock object', () => {
    const interpreter = lib.interpret(clock1);
    expect(interpreter()).to.deep.eq(clock1);
  });

  it('interpret clock function', () => {
    const interpreter = lib.interpret(() => clock1);
    expect(interpreter()).to.deep.eq(clock1);
  });

});

/* eslint-env mocha */
