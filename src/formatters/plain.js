import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (typeof value === 'boolean') return value;
  return `'${value}'`;
};

const plain = (ast) => {
  const iter = (coll, result) => {
    const propertyActions = {
      parent: (node, acc) => iter(node.children, `${acc}${node.key}.`),
      added: (node, acc) => `Property '${acc}${node.key}' was added with value: ${stringify(node.value)}`,
      removed: (node, acc) => `Property '${acc}${node.key}' was removed`,
      changed: (node, acc) => `Property '${acc}${node.key}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`,
    };
    return coll.filter((obj) => obj.type !== 'unchanged').flatMap((obj) => propertyActions[obj.type](obj, result)).join('\n');
  };
  return iter(ast, '');
};

export default plain;
