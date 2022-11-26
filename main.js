'use strict';

const path = require('node:path');
const fs = require('node:fs');

const npmLoad = require('./lib/npmLoad.js');
const metadataLoad = require('./lib/metadataLoad.js');
const initializer = require('./lib/initializer.js');

const rootPath = process.cwd();
const appSandbox = {
  rootPath,
  appPath: path.join(rootPath, 'app'),
  modulesPath: path.join(rootPath, 'modules'),
  metadata: {
    config: {},
    mount(kind, mountPoint, data = {}, remount = false) {
      if (!this[kind]) this[kind] = {};
      if (!remount && mountPoint in this[kind])
        throw new Error(`key ${mountPoint} is already exists in appSandbox.metadata.${kind}`);
      this[kind][mountPoint] = data;
    },
  },
  startAfterInit: [],
  console: console,
  node: { path, fs },
  npm: {},
  mount(mountPoint, data = {}, remount = false) {
    if (!remount && mountPoint in this)
      throw (`key ${mountPoint} is already exists in appSandbox`);
    this[mountPoint] = data;
  },
};

(async () => {
  await npmLoad(appSandbox);
  await metadataLoad(appSandbox, { config: { kindPath: 'config' } });
  await initializer(appSandbox);
  
  for (const fn of appSandbox.startAfterInit) fn();
  appSandbox.console.log(`app ${appSandbox.metadata.config.app.name} loaded...`);
})();
