import * as fs from 'fs';
import * as path from 'path';
import _ from 'lodash';

const genDiff = (filepath1, filepath2) => {
  const cwd = process.cwd();
  const file1 = fs.readFileSync(path.resolve(cwd, path.relative(cwd, filepath1)), 'utf-8');
  const file2 = fs.readFileSync(path.resolve(cwd, path.relative(cwd, filepath2)), 'utf-8');
  const obj1 = JSON.parse(file1);
  const obj2 = JSON.parse(file2);

  const callBack = (acc, element) => {
    const [key, value] = element;
    if (!_.has(obj2, key)) {
      acc.push(` - ${key}: ${obj1[key]}`);
      return acc;
    }
    if (!_.has(obj1, key)) {
      acc.push(` + ${key}: ${obj2[key]}`);
      return acc;
    }
    if (obj2[key] === obj1[key]) {
      acc.push(`   ${key}: ${value}`);
      return acc;
    }
    if (obj2[key] !== obj1[key]) {
      if (!acc.includes(` - ${key}: ${obj1[key]}`)) {
        acc.push(` - ${key}: ${obj1[key]}`);
        acc.push(` + ${key}: ${obj2[key]}`);
      }
      return acc;
    }
    return acc;
  };

  const arr = Object.entries(obj1).concat(Object.entries(obj2)).sort().reduce(callBack, []);
  const diff = `{\n${_.sortedUniq(arr).join('\n')}\n}`;

  return diff;
};
export default genDiff;
