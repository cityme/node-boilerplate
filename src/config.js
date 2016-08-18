import path from 'path';
import nconf from 'nconf';
import yaml from 'js-yaml';

const nconfyaml = {
  stringify: (obj, options) => {
    return yaml.safeDump(obj, options);
  },
  parse: (obj, options) => {
    return yaml.safeLoad(obj, options);
  },
};

nconf.env().argv();

const env = nconf.get('NODE_ENV') || 'development';

function relativePath(...p) {
  p.unshift(__dirname);
  return path.join(...p);
}

export default function config() {
  let f = 'development.json';
  if (env === 'production') {
    f = 'production.json';
  }
  if (env === 'tests') {
    f = 'tests.json';
  }
  nconf.argv().env()
  .file({
    file: relativePath('..', 'config', f),
  })
  .file({
    file: relativePath('..', 'config', 'development.yaml'),
    format: nconfyaml,
  })
  .defaults({});
}
