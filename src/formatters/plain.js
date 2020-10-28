import _ from 'lodash';

const stringify = (value) => {
  let newValue = null;
  switch (true) {
    case _.isObject(value):
      newValue = '[complex value]';
      break;
    case typeof value === 'string':
      newValue = `'${value}'`;
      break;
    default:
      newValue = value;
  }
  return newValue;
};

const propertyActions = {
  parent: (node, pathStorage, f) => {
    const newPathStorage = [...pathStorage, node.key];
    return f(node.children, newPathStorage);
  },
  unchanged: () => [],
  added: (node, pathStorage) => {
    const newPathStorage = [...pathStorage, node.key];
    return `Property '${newPathStorage.join('.')}' was added with value: ${stringify(node.value)}`;
  },
  removed: (node, pathStorage) => {
    const newPathStorage = [...pathStorage, node.key];
    return `Property '${newPathStorage.join('.')}' was removed`;
  },
  changed: (node, pathStorage) => {
    const newPathStorage = [...pathStorage, node.key];
    return `Property '${newPathStorage.join('.')}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
  },
};

const plain = (ast) => {
  const iter = (nodes, path = []) => nodes.flatMap((obj) => propertyActions[obj.type](obj, path, iter)).join('\n');
  return iter(ast);
};

export default plain;
