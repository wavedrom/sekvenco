'use strict';

const traverse = (wd, fn) => {
  wd.signal.map(e => fn(e));
};

module.exports = traverse;
