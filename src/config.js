import path from 'path';
import nconf from 'nconf';

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
  nconf.argv().env().file({
    file: relativePath('..', 'config', f),
  })
  .defaults({});
}
