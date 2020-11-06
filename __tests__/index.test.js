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

describe.each(['json', 'plain', 'stylish'])('output format %s', (outputFormat) => {
  const dataFormats = {
    json: 'json',
    plain: 'ini',
    stylish: 'yml',
  };
  const expected = readFile(`${outputFormat}Diff.txt`);
  test(`data format ${dataFormats[outputFormat]}`, () => {
    const file1 = getFixturePath(`file1.${dataFormats[outputFormat]}`);
    const file2 = getFixturePath(`file2.${dataFormats[outputFormat]}`);
    expect(genDiff(file1, file2, outputFormat)).toBe(expected);
  });
});
