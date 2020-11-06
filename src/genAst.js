import _ from 'lodash';

const genAst = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2)).sort();
  return keys.map((key) => {
    if (!_.has(obj1, key)) return { key, type: 'added', value: obj2[key] };
    if (!_.has(obj2, key)) return { key, type: 'removed', value: obj1[key] };
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) return { key, type: 'parent', children: genAst(obj1[key], obj2[key]) };
    if (!_.isEqual(obj1[key], obj2[key])) {
      return {
        key, type: 'changed', value1: obj1[key], value2: obj2[key],
      };
    }
    return { key, type: 'unchanged', value: obj1[key] };
  });
};
export default genAst;
