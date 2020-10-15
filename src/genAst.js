import _ from 'lodash';

const isSharedKey = (key, obj1, obj2) => _.has(obj1, key) && _.has(obj2, key);
const hasSameValue = (key, obj1, obj2) => obj1[key] === obj2[key];
const isNewKey = (key, obj1, obj2) => _.has(obj2, key) && !_.has(obj1, key);
const areObjects = (key, obj1, obj2) => _.isObject(obj1[key]) && _.isObject(obj2[key]);

const propertyActions = [
  {
    check: (key, obj1, obj2) => areObjects(key, obj1, obj2),
    process: (key, obj1, obj2, f) => ({ key, type: 'parent', children: f(obj1[key], obj2[key]) }),
  },
  {
    check: (key, obj1, obj2) => isSharedKey(key, obj1, obj2) && hasSameValue(key, obj1, obj2),
    process: (key, obj) => ({ key, type: 'unchanged', value: obj[key] }),
  },
  {
    check: (key, obj1, obj2) => isSharedKey(key, obj1, obj2) && !hasSameValue(key, obj1, obj2),
    process: (key, obj1, obj2) => ({
      key, type: 'changed', oldValue: obj1[key], newValue: obj2[key],
    }),
  },
  {
    check: (key, obj1, obj2) => isNewKey(key, obj1, obj2),
    process: (key, obj1, obj2) => ({ key, type: 'added', value: obj2[key] }),
  },
  {
    check: (key, obj1, obj2) => !isNewKey(key, obj1, obj2),
    process: (key, obj1) => ({ key, type: 'removed', value: obj1[key] }),
  },
];

const getPropertyAction = (key, obj1, obj2) => (
  propertyActions.find(({ check }) => check(key, obj1, obj2)));

const genAst = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2)).sort();
  return keys.map((key) => {
    const { process } = getPropertyAction(key, obj1, obj2);
    return process(key, obj1, obj2, genAst);
  });
};
export default genAst;
