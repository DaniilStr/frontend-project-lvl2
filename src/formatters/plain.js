import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (typeof value === 'boolean' || typeof value === 'number') return value;
  return `'${value}'`;
};

const plain = (ast) => {
  const iter = (coll, arr = []) => {
    const propertyActions = {
      parent: (node, acc) => iter(node.children, [`${acc}${node.key}.`]),
      unchanged: () => [],
      added: (node, acc) => [`Property '${acc}${node.key}' was added with value: ${stringify(node.value)}`],
      removed: (node, acc) => [`Property '${acc}${node.key}' was removed`],
      changed: (node, acc) => [`Property '${acc}${node.key}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`],
    };
    return coll.flatMap((obj) => propertyActions[obj.type](obj, arr)).join('\n');
  };
  return iter(ast);
};

export default plain;
