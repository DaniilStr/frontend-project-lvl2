import _ from 'lodash';

const propertyActions = [
  {
    check: (key, obj1, obj2) => _.isObject(obj1[key]) && _.isObject(obj2[key]),
    process: (key, obj1, obj2, f) => ({ key, type: 'parent', children: f(obj1[key], obj2[key]) }),
  },
  {
    check: (key, obj1, obj2) => (_.has(obj1, key) && _.has(obj2, key)) && obj1[key] === obj2[key],
    process: (key, obj) => ({ key, type: 'unchanged', value: obj[key] }),
  },
  {
    check: (key, obj1, obj2) => (_.has(obj1, key) && _.has(obj2, key)) && !(obj1[key] === obj2[key]),
    process: (key, obj1, obj2) => ({ key, type: 'changed', oldValue: obj1[key], newValue: obj2[key] }),
  },
  {
    check: (key, obj1, obj2) => _.has(obj2, key) && !_.has(obj1, key),
    process: (key, obj1, obj2) => ({ key, type: 'added', value: obj2[key] }),
  },
  {
    check: (key, obj1, obj2) => !_.has(obj2, key) && _.has(obj1, key),
    process: (key, obj1) => ({ key, type: 'removed', value: obj1[key] }),
  },
];

const genAst = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2)).sort();
  return keys.map((key) => {
    const { process } = propertyActions.find(({ check }) => check(key, obj1, obj2));
    return process(key, obj1, obj2, genAst);
  });
};
export default genAst;
