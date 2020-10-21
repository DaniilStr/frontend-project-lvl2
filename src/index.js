import * as fs from 'fs';
import * as path from 'path';
import parse from './parsers.js';
import genAst from './genAst.js';
import render from './formatters/index.js';

const genDiff = (filepath1, filepath2, format) => {
  const cwd = process.cwd();
  const extname1 = path.extname(filepath1);
  const extname2 = path.extname(filepath2);

  const obj1 = fs.readFileSync(path.resolve(cwd, path.relative(cwd, filepath1)), 'utf-8');
  const obj2 = fs.readFileSync(path.resolve(cwd, path.relative(cwd, filepath2)), 'utf-8');

  const data1 = parse(obj1, extname1);
  const data2 = parse(obj2, extname2);

  const ast = genAst(data1, data2);
  const diff = render(ast, format);

  return diff;
};

export default genDiff;
