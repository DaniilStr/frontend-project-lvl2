import _ from 'lodash';

const stringify = (value) => (_.isObject(value) ? '[complex value]' : typeof value === 'boolean' ? value :`'${value}'`);

const plain = (ast) => {
    const propertyActions = {
        parent: (node, acc) => iter(node.children, `${acc}${node.key}.`),
        added: (node, acc) => `Property '${acc}${node.key}' was added with value: ${stringify(node.value)}`,
        removed: (node, acc) => `Property '${acc}${node.key}' was removed`,
        changed: (node, acc) => {
            return `Property '${acc}${node.key}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`
        },
    };
    const iter = (coll, acc) => {
        return coll.filter(obj => obj.type !== 'unchanged').flatMap(obj => propertyActions[obj.type](obj, acc)).join('\n');
    }
    return iter(ast, ``);
};

export default plain;
