import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJSON from './json.js';

const renderers = {
  stylish: formatStylish,
  plain: formatPlain,
  json: formatJSON,
};

export default (ast, format = 'stylish') => renderers[format](ast);
