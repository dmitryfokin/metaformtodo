'use strict';

const init = (appSandbox, configInit) => {
  const {modulesPath, node, metadata} = appSandbox;
  const filePath = node.path.join(modulesPath, 'logger.js');
  const {config} = metadata;
  appSandbox.console = require(filePath)({...config[configInit.config]});
}

module.exports = {init};
