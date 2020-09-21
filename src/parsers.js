import yaml from 'js-yaml';
import * as fs from 'fs';
import * as path from 'path';

export default (filepath) => {
  const cwd = process.cwd();
  const format = path.extname(filepath);
  if (format === ' ' || format === '.json') {
    const file = fs.readFileSync(path.resolve(cwd, path.relative(cwd, filepath)), 'utf-8');
    return JSON.parse(file);
  }
  if (format === '.yml') {
    const file = yaml.safeLoad(fs.readFileSync(path.resolve(cwd, path.relative(cwd, filepath)), 'utf8'));
    return file;
  }
  return null;
};
