'use strict';

const interpret = (desc) => {

  if (typeof desc === 'string') {
    const fn = new Function(`
return (
${desc}
);
  `);
    return fn;
  }

  if (typeof desc === 'function') {
    return desc;
  }

  return () => desc;
};

module.exports = interpret;

/* eslint no-new-func: 0 */
