import { fileURLToPath } from 'url';
import * as path from 'path';
import { dirname } from 'path';
import genDiff from '../src/index';

/* eslint-disable no-underscore-dangle */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('genDiff', () => {
  const expected = '{\n - follow: false\n   host: hexlet.io\n - proxy: 123.234.53.22\n - timeout: 50\n + timeout: 20\n + verbose: true\n}';
  expect(genDiff(getFixturePath('jsonFile1.json'), getFixturePath('jsonFile2.json'))).toBe(expected);
  expect(genDiff(getFixturePath('yamlFile1.yml'), getFixturePath('yamlFile2.yml'))).toBe(expected);
  expect(genDiff(getFixturePath('jsonFile1.json'), getFixturePath('yamlFile2.yml'))).toBe(expected);
});
