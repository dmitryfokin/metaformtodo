'use strict';

const mountAPI = (appSandbox, configAPI) => {
  const { modulesPath, node } = appSandbox;
  const { mountPoint, transport, port } = configAPI;

  const pathArr = [modulesPath, 'transport', `${transport}.js`];
  const filePath = node.path.join(...pathArr);

  const service = require(filePath);
  appSandbox.startAfterInit.push(
    () => service(appSandbox[mountPoint], port, appSandbox.console)
  );
};

const init = (appSandbox, configInit) => {
  const { metadata } = appSandbox;
  const { config } = metadata;
  const configAPI = config[configInit.config];

  const configAPIArr = Array.isArray(configAPI) ? configAPI : [configAPI];
  for (const cfg of configAPIArr) {
    mountAPI(appSandbox, { ...cfg });
  }
}

module.exports = { init };
