import { fileURLToPath } from 'url';
import * as path from 'path';
import { dirname } from 'path';
import parser from '../src/parsers';

/* eslint-disable no-underscore-dangle */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('parser', () => {
  const expected = {
    follow: false,
    host: 'hexlet.io',
    proxy: '123.234.53.22',
    timeout: 50,
  };
  expect(parser(getFixturePath('jsonFile1.json'), getFixturePath('jsonFile2.json'))).toStrictEqual(expected);
  expect(parser(getFixturePath('yamlFile1.yml'), getFixturePath('yamlFile2.yml'))).toStrictEqual(expected);
  expect(parser(getFixturePath('jsonFile1.json'), getFixturePath('yamlFile2.yml'))).toStrictEqual(expected);
});
