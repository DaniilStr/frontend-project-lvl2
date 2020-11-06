import _ from 'lodash';

const tab = (depth = 1) => '    '.repeat(depth);

const valueToString = (prop, depth = 0, actions) => {
  if (!_.isObject(prop)) return prop;
  return `{\n${Object.entries(prop)
    .map(([key, value]) => actions.unchanged({ key, value }, depth + 1))
    .join('\n')}\n${tab(depth + 1)}}`;
};

const propertyActions = {
  parent: (node, depth, iter) => `    ${tab(depth)}${node.key}: ${iter(node.children, depth + 1)}`,
  unchanged: (node, depth) => `    ${tab(depth)}${node.key}: ${valueToString(node.value, depth, propertyActions)}`,
  added: (node, depth) => `  ${tab(depth)}+ ${node.key}: ${valueToString(node.value, depth, propertyActions)}`,
  removed: (node, depth) => `  ${tab(depth)}- ${node.key}: ${valueToString(node.value, depth, propertyActions)}`,
  changed: (node, depth) => {
    const before = `  ${tab(depth)}- ${node.key}: ${valueToString(node.value1, depth, propertyActions)}`;
    const after = `  ${tab(depth)}+ ${node.key}: ${valueToString(node.value2, depth, propertyActions)}`;
    return [before, after];
  },
};

const stylish = (ast) => {
  const iter = (nodes, depth = 0) => `{\n${nodes.flatMap((node) => propertyActions[node.type](node, depth, iter))
    .join('\n')}\n${tab(depth)}}`;
  return iter(ast);
};

export default stylish;
