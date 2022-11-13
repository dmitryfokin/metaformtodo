'use strict';

const init = (appSandbox, configInit) => {
  const {modulesPath, node, metadata, npm} = appSandbox;
  const filePath = node.path.join(modulesPath, 'db.js');
  const {config} = metadata;
  const {mountPoint} = configInit;
  const configDB = {...config[configInit.config]};
  appSandbox[mountPoint] = require(filePath)(npm.pg, configDB);
}

module.exports = {init};
