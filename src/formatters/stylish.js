import _ from 'lodash';

const tab = (depth = 0) => '  '.repeat(depth);

const valueToString = (prop, depth = 0, actions) => {
  if (!_.isObject(prop)) return prop;
  return `{\n${Object.entries(prop)
    .map(([key, value]) => actions.unchanged({ key, value }, depth + 2))
    .join('\n')}\n${tab(depth + 1)}}`;
};

const propertyActions = {
  parent: (node, depth, f) => `${tab(depth + 1)}${node.key}: ${f(node.children, depth + 2)}`,
  unchanged: (node, depth) => `${tab(depth + 1)}${node.key}: ${valueToString(node.value, depth, propertyActions)}`,
  added: (node, depth, f, f2) => f2(node.key, node.value, depth, '+'),
  removed: (node, depth, f, f2) => f2(node.key, node.value, depth, '-'),
  changed: (node, depth, f, f2) => {
    const before = f2(node.key, node.value1, depth, '-');
    const after = f2(node.key, node.value2, depth, '+');
    return [before, after];
  },
};

const toStringAction = (key, value, depth, sign) => `${tab(depth)}${sign} ${key}: ${valueToString(value, depth, propertyActions)}`;

const stylish = (ast) => {
  const iter = (nodes, level = 1) => `{\n${nodes.flatMap((node) => propertyActions[node.type](node, level, iter, toStringAction))
    .join('\n')}\n${tab(level - 1)}}`;
  return iter(ast);
};

export default stylish;
