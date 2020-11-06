import * as fs from 'fs';
import * as path from 'path';
import parse from './parsers.js';
import genAst from './genAst.js';
import render from './formatters/index.js';

const readFile = (filepath) => {
  const cwd = process.cwd();
  return fs.readFileSync(path.resolve(cwd, filepath), 'utf-8');
};

const getFormatName = (filepath) => path.extname(filepath).slice(1);

const genDiff = (filepath1, filepath2, format) => {
  const formatName1 = getFormatName(filepath1);
  const formatName2 = getFormatName(filepath2);

  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);

  const obj1 = parse(data1, formatName1);
  const obj2 = parse(data2, formatName2);

  const ast = genAst(obj1, obj2);
  const diff = render(ast, format);

  return diff;
};

export default genDiff;
