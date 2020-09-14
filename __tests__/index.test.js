import genDiff from "../src/index.js";

test('bla bla', () => {
  const expected = '{\n - follow: false\n   host: hexlet.io\n - proxy: 123.234.53.22\n - timeout: 50\n + timeout: 20\n + verbose: true\n}';
  expect(genDiff('__tests__/file1.json', '__tests__/file2.json')).toBe(expected);
});
