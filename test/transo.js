'use strict';

const { expect } = require('chai');

const lib = require('../lib');

const porto = { // phisical ports of driver module
  clock:       1,
  p0_htrans:  -2,
  p0_hsize:   -3,
  p0_hburst:  -3,
  p0_hwrite:  -1,
  p0_hprot:   -4,
  p0_haddr:  -32,
  p0_hwdata: -32,
  p0_hmasterlock: -1,
  p0_hresp:    1,
  p0_hrdata:  32
};

const portMapP0 = { // phisical to logical translation
  clock:  'clock',
  htrans: 'p0_htrans',
  hsize:  'p0_hsize',
  hburst: 'p0_hburst',
  hwrite: 'p0_hwrite',
  hprot:  'p0_hprot',
  haddr:  'p0_haddr',
  hwdata: 'p0_hwdata',
  hmasterlock: 'p0_hmasterlock',
  hresp:  'p0_hresp',
  hrdata: 'p0_hrdata'
};


const wdWr = {signal: [
  {name: 'clock',   wave: 'p.......'},
  {name: 'haddr',   wave: '0.=.....', data: '0'},
  {name: 'htrans',  wave: '0.=0....', data: '2'},
  {name: 'hwdata',  wave: '0.=.....', data: '0x1234'},
  {},
  {name: 'hresp',   wave: '1.......'}
]};

const wdRd = {signal: [
  {name: 'clock',   wave: 'p.....'},
  {name: 'haddr',   wave: '0.=...', data: '0'},
  {name: 'htrans',  wave: '0.=...', data: '2'},
  {},
  {name: 'hresp',   wave: '1.....'},
  {name: 'hrdata',  wave: '0..=..', data: '0xffffffff'}
]};

describe('transo', () => {
  it('ahb_wr', () => {
    const logTs = [wdWr, wdRd];
    const scP = lib.systemc.ports(porto);
    expect(scP).to.be.an('array');
    // console.log(scP);
    const phyTs = logTs.map(t => lib.log2phy(t, portMapP0));
    // console.log(JSON.stringify(phyTs, null, 2));
    phyTs.map((t, idx) => {
      const steps = lib.systemc.steps(t, porto, 'clock', idx);
      // console.log(JSON.stringify(steps, null, 2));
      const block = lib.systemc.emitter()(steps);
      // console.log(block);
      expect(block).to.be.a('string');
    });
    expect(phyTs).to.be.an('array');
  });
});

/* eslint-env mocha */
/* eslint camelcase: 0 */
