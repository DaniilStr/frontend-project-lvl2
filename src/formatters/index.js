import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const renders = {
    stylish: stylish,
    plain: plain,
    json: json,
};

export default (ast, format = 'stylish') => renders[format](ast);
