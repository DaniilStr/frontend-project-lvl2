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

test('StylishFormat', () => {
  const expected = readFile('resultStylish.txt');
  expect(genDiff(getFixturePath('before.json'), getFixturePath('after.json'))).toBe(expected);
  expect(genDiff(getFixturePath('before.json'), getFixturePath('after.yml'))).toBe(expected);
  expect(genDiff(getFixturePath('before.json'), getFixturePath('after.ini'))).toBe(expected);
  expect(genDiff(getFixturePath('before.yml'), getFixturePath('after.yml'))).toBe(expected);
  expect(genDiff(getFixturePath('before.yml'), getFixturePath('after.ini'))).toBe(expected);
  expect(genDiff(getFixturePath('before.ini'), getFixturePath('after.ini'))).toBe(expected);
});
test('PlainFormat', () => {
  const expected = readFile('resultPlain.txt');
  expect(genDiff(getFixturePath('before.json'), getFixturePath('after.json'), 'plain')).toBe(expected);
  expect(genDiff(getFixturePath('before.json'), getFixturePath('after.yml'), 'plain')).toBe(expected);
  expect(genDiff(getFixturePath('before.json'), getFixturePath('after.ini'), 'plain')).toBe(expected);
  expect(genDiff(getFixturePath('before.yml'), getFixturePath('after.yml'), 'plain')).toBe(expected);
  expect(genDiff(getFixturePath('before.yml'), getFixturePath('after.ini'), 'plain')).toBe(expected);
  expect(genDiff(getFixturePath('before.ini'), getFixturePath('after.ini'), 'plain')).toBe(expected);
});
test('JsonFormat', () => {
  const expected = readFile('resultJson.txt');
  expect(genDiff(getFixturePath('before.json'), getFixturePath('after.json'), 'json')).toBe(expected);
  expect(genDiff(getFixturePath('before.json'), getFixturePath('after.yml'), 'json')).toBe(expected);
  expect(genDiff(getFixturePath('before.json'), getFixturePath('after.ini'), 'json')).toBe(expected);
  expect(genDiff(getFixturePath('before.yml'), getFixturePath('after.yml'), 'json')).toBe(expected);
  expect(genDiff(getFixturePath('before.yml'), getFixturePath('after.ini'), 'json')).toBe(expected);
  expect(genDiff(getFixturePath('before.ini'), getFixturePath('after.ini'), 'json')).toBe(expected);
});
