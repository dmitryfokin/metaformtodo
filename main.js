'use strict';

const path = require('node:path');
const metadataLoad = require('./lib/metadataLoad.js');

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
  
  for (const key of Object.keys(metadata.modules)) {
    const {mountPoint, fn} = metadata.modules[key];
    sandbox[mountPoint] = fn(metadata.config);
  };
  
  sandbox.console.log(metadata);
})();
