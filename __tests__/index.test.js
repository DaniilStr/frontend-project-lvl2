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

describe('genDiff', () => {
  const expected1 = readFile('resultStylish.txt');
  const expected2 = readFile('resultPlain.txt');
  const expected3 = readFile('resultJson.txt');

  const file1Json = getFixturePath('file1.json');
  const file1Yml = getFixturePath('file1.yml');
  const file1Ini = getFixturePath('file1.ini');

  const file2Json = getFixturePath('file2.json');
  const file2Yml = getFixturePath('file2.yml');
  const file2Ini = getFixturePath('file2.ini');

  test.each`
    a                    | b             | c             | d            | e
    ${'isStylishFormat'} | ${file1Json} | ${file2Json} | ${'stylish'} | ${expected1}
    ${'isPlainFormat'}   | ${file1Yml}  | ${file2Yml}  | ${'plain'}   | ${expected2}
    ${'isJsonFormat'}    | ${file1Ini}  | ${file2Ini}  | ${'json'}    | ${expected3}
  `('$a', ({ b, c, d, e }) => {
    expect(genDiff(b, c, d)).toBe(e);
  });
});
