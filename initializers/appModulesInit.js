'use strict';

const loadScripts = require('../lib/loadScripts.js');

const beforeInit = async (appSandbox, configInit) => {
  const { node, appPath } = appSandbox;

  for (const meta of configInit.mount) {
    const kindPath = node.path.join(appPath, meta.path);
    const appModules = await loadScripts(kindPath);
    appSandbox.metadata.mount('appModules', meta.mountPointMetadata, appModules);
    appSandbox.mount(meta.mountPointMetadata, {});
   };
};

const init = async (appSandbox, configInit) => {
  for (const meta of configInit.mount) {
    const sandbox = { ...appSandbox };
    const appModules = appSandbox.metadata.appModules[meta.mountPointMetadata];

    const data = {};
    for (const appModule of appModules) {
      data[appModule.name] = await appModule.script.runInContext(sandbox);
    };

    appSandbox.mount(meta.mountPointMetadata, data, true);
  };
};

module.exports = { beforeInit, init };
