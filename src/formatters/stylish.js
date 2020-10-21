import _ from 'lodash';

const tab = (depth = 0) => '  '.repeat(depth);

const valueToString = (value, depth = 0) => {
  if (!_.isObject(value)) return value;
  return `{\n${_.keys(value).map((key) => {
  if (_.isObject(value[key])) {
    return `${tab(depth + 3)}${key}: ${valueToString(value[key], depth + 2)}`;
  }
  return `${tab(depth + 3)}${key}: ${value[key]}`;
}).join('\n')}\n${tab(depth + 1)}}`};

const toStringAction = (key, value, depth, sign) => `${tab(depth)}${sign} ${key}: ${valueToString(value, depth)}`;

const stylish = (ast) => {
  const propertyActions = {
    parent: (node, depth) => `${tab(depth + 1)}${node.key}: ${iter(node.children, depth + 2)}`,
    unchanged: (node, depth) => `${tab(depth + 1)}${node.key}: ${valueToString(node.value, depth)}`,
    added: (node, depth) => toStringAction(node.key, node.value, depth, '+'),
    removed: (node, depth) => toStringAction(node.key, node.value, depth, '-'),
    changed: (node, depth) => {
      const before = toStringAction(node.key, node.oldValue, depth, '-');
      const after = toStringAction(node.key, node.newValue, depth, '+');
      return [before, after];
    },
  };
  const iter = (coll, level = 1) => {
    return `{\n${coll.flatMap((obj) => propertyActions[obj.type](obj, level)).join('\n')}\n${tab(level - 1)}}`;
  }
  return iter(ast);
};

export default stylish;
