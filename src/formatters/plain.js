const stringify = (value) => {
  switch (typeof value) {
    case 'null':
      return 'null';
    case 'object':
      return '[complex value]';
    case 'string':
      return `'${value}'`;
    default:
      return value;
  }
};

const getPropertyName = (node, pathStorage) => [...pathStorage, node.key].join('.');

const propertyActions = {
  parent: (node, pathStorage, iter) => iter(node.children, [...pathStorage, node.key]),
  unchanged: () => [],
  added: (node, pathStorage) => `Property '${getPropertyName(node, pathStorage)}' was added with value: ${stringify(node.value)}`,
  removed: (node, pathStorage) => `Property '${getPropertyName(node, pathStorage)}' was removed`,
  changed: (node, pathStorage) => `Property '${getPropertyName(node, pathStorage)}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`,
};

const plain = (ast) => {
  const iter = (nodes, path = []) => nodes
    .flatMap((node) => propertyActions[node.type](node, path, iter));
  return iter(ast).join('\n');
};

export default plain;
