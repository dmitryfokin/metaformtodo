'use strict';

const mountAPI = (appSandbox, configAPI) => {
  const {appPath, modulesPath, node, metadata} = appSandbox;
  const {staticPath, port} = configAPI;
  
  const pathArr = [modulesPath, 'static.js'];
  const filePath = node.path.join(...pathArr);

  const staticAppPath = node.path.join(appPath, staticPath);

  const service = require(filePath);
  appSandbox.startAfterInit.push(
    () => service(staticAppPath, port, appSandbox.console)
  );
};

const init = (appSandbox, configInit) => {
  const {metadata} = appSandbox;
  const {config} = metadata;
  const configAPI = config[configInit.config];
  if (Array.isArray(configAPI)) {
    for (const cfg of configAPI) mountAPI(appSandbox, {...cfg});
  } else {
    mountAPI(appSandbox, {...configAPI});
  };
}

module.exports = {init};
