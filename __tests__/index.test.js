import { fileURLToPath } from 'url';
import * as path from 'path';
import { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/index';

/* eslint-disable no-underscore-dangle */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filname) => fs.readFileSync(getFixturePath(filname), 'utf-8');

describe('', () => {
  const expected1 = readFile('resultStylish.txt');
  const expected2 = readFile('resultPlain.txt');
  const expected3 = readFile('resultJson.txt');

  const file1_json = getFixturePath('file1.json');
  const file1_yml = getFixturePath('file1.yml');
  const file1_ini = getFixturePath('file1.ini');

  const file2_json = getFixturePath('file2.json');
  const file2_yml = getFixturePath('file2.yml');
  const file2_ini = getFixturePath('file2.ini');

  test.each`
    a                    | b             | c             | d            | e
    ${'isStylishFormat'} | ${file1_json} | ${file2_json} | ${'stylish'} | ${expected1}
    ${'isPlainFormat'}   | ${file1_yml}  | ${file2_yml}  | ${'plain'}   | ${expected2}
    ${'isJsonFormat'}    | ${file1_ini}  | ${file2_ini}  | ${'json'}    | ${expected3}
  `(`$a`, ({b, c, d, e}) => {
    expect(genDiff(b, c, d)).toBe(e);
  });
});
