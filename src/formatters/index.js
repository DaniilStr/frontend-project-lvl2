import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const renders = {
  stylish,
  plain,
  json,
};

export default (ast, format = 'stylish') => renders[format](ast);
