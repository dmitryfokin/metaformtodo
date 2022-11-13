'use strict'

const loadScripts = require('./loadScripts.js');

const kindMetadataLoad = (appSandbox, meta) => {
  const {metadata} = appSandbox;
  for (const keyMetadata of Object.keys(meta.exportedDefault)) {
    const data = meta.exportedDefault[keyMetadata];
    if (typeof data !== "object") continue;
    if (!(keyMetadata in metadata)) metadata[keyMetadata] = {};

    for (const key of Object.keys(data)) {
      metadata.mount(keyMetadata, key, data[key]);
    };
  };
};

module.exports = async (appSandbox, kinds, sandbox = {}) => {
  const {node, appPath} = appSandbox;

  for (const kindKey of Object.keys(kinds)) {
    const kind = kinds[kindKey];
    const kindPath = node.path.join(appPath, kind.kindPath);
    const kindData = await loadScripts(kindPath, sandbox);

    for (const meta of kindData) {
      kindMetadataLoad(appSandbox, meta.script);
    };
  };
};
