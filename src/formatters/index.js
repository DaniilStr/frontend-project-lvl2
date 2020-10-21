import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJSON from './json.js';

const renders = {
  stylish: formatStylish,
  plain: formatPlain,
  json: formatJSON,
};

export default (ast, format = 'stylish') => renders[format](ast);
