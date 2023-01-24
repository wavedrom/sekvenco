'use strict';

const tailComment = node => (node.comment === undefined) ? '' : ' // ' +   node.comment;

const systemcEmiter = () => {

  const indent = body => {
    if (Array.isArray(body)) {
      body = body.join('\n');
    }
    return body.toString();
  };

  const rec = (node) => {
    const { kind, body, lhs, rhs, clock } = node;
    switch(kind) {
    case 'block':
      return indent([
        '{' + tailComment(node),
        ...body.map(exp => rec(exp)),
        '}'
      ]);
    case 'posedge':
      return indent([
        ...(body.length ? [''] : []),
        'wait(' + clock + '.posedge_event());',
        ...body.map(e => rec(e)),
        ...(body.length ? [''] : [])
      ]);
    case 'assign':
      return indent(lhs + '.write(' + rhs + ');');
    }
  };
  return rec;
};

module.exports = systemcEmiter;
