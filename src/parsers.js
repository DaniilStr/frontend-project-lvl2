import _ from 'lodash';
import yaml from 'js-yaml';
import ini from 'ini';

const isNumber = (data) => !Number.isNaN(parseFloat(data));

const numberifyValues = (obj) => _.mapValues(obj, (value) => {
  if (_.isObject(value)) {
    return numberifyValues(value);
  }
  return isNumber(value) ? parseFloat(value) : value;
});

const parseIni = (data) => {
  const objectFromIni = ini.parse(data);
  return numberifyValues(objectFromIni);
};

const parsers = {
  ini: parseIni,
  yml: yaml.safeLoad,
  json: JSON.parse,
};

export default (data, format) => parsers[format](data);
