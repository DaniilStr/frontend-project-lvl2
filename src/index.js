import parser from './parsers.js';
import genAst from './genAst.js';
import render from './formatters/index.js';

const genDiff = (filepath1, filepath2, format) => {
  const obj1 = parser(filepath1);
  const obj2 = parser(filepath2);
  const ast = genAst(obj1, obj2);
  const diff = render(ast, format);
  return diff;
};

export default genDiff;
