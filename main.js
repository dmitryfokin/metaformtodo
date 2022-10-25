'use strict';

const path = require('node:path');
const metadataLoad = require('./lib/metadataLoad.js');
const modulesLoad = require('./lib/modulesLoad.js');

const rootPath = process.cwd();
const metadata = {};
metadata.app = {
  rootPath,
  appPath: path.join(rootPath, 'app'),
  modulesPath: path.join(rootPath, 'modules'),
};

(async () => {
  const sandbox = {metadata, console: console};
  sandbox.node = {path};
  await metadataLoad(sandbox, 'config');
  await modulesLoad(sandbox);
  
  sandbox.console.log(metadata);
})();
