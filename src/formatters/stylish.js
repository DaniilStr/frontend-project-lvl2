import _ from 'lodash';

const tab = (depth = 0) => '  '.repeat(depth);

const objToString = (obj, depth = 0) => `{\n${_.keys(obj).map((key) => {
    if (_.isObject(obj[key])) {
        return `${tab(depth + 3)}${key}: ${objToString(obj[key], depth + 2)}`;
    }
    return `${tab(depth + 3)}${key}: ${obj[key]}`;
}).join('\n')}\n${tab(depth + 1)}}`;

const stringify = (value, depth) => (_.isObject(value) ? objToString(value, depth) : value);
const toStringAction = (key, value, depth, sign) => `${tab(depth)}${sign} ${key}: ${stringify(value, depth)}`;

const propertyActions = {
    parent: (node, depth) => `${tab(depth + 1)}${node.key}: ${stylish(node.children, depth + 2)}`,
    unchanged: (node, depth) => `${tab(depth + 1)}${node.key}: ${stringify(node.value, depth)}`,
    added: (node, depth) => toStringAction(node.key, node.value, depth, '+'),
    removed: (node, depth) => toStringAction(node.key, node.value, depth, '-'),
    changed: (node, depth) => {
        const before = toStringAction(node.key, node.oldValue, depth, '-');
        const after = toStringAction(node.key, node.newValue, depth, '+');
        return [before, after];
    },
};

const stylish = (ast, level = 1) => {
    return `{\n${ast.flatMap(obj => propertyActions[obj.type](obj, level)).join('\n')}\n${tab(level - 1)}}`;
};

export default stylish;
