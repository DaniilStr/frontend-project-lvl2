import _ from 'lodash';
import yaml from 'js-yaml';
import ini from 'ini';
import * as fs from 'fs';
import * as path from 'path';

const isNumber = (data) => !Number.isNaN(parseFloat(data));

const makeCorrectValue = (obj) => _.mapValues(obj, (value) => {
  if (_.isObject(value)) {
    return makeCorrectValue(value);
  }
  return isNumber(value) ? parseFloat(value) : value;
});

const iniParse = (data) => {
  const objectFromIni = ini.parse(data);
  return makeCorrectValue(objectFromIni);
};

const parserMethod = {
  ".ini": iniParse,
  ".yml": yaml.safeLoad,
  ".json": JSON.parse,
};

export default (filepath) => {
  const cwd = process.cwd();
  const format = path.extname(filepath);
  return parserMethod[format](fs.readFileSync(path.resolve(cwd, path.relative(cwd, filepath)), 'utf-8'));
};
