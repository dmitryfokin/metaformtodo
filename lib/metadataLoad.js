'use strict'

const fsp = require('fs').promises;
const path = require('path');
const loadScript = require('./loadScript.js');

const readFiles = async (pathFiles, kindData, sandbox) => {
  const files = Array.from(
    await fsp.readdir(pathFiles, { withFileTypes: true })
  ).filter(file => !(file.name.startsWith('.') || !file.name.endsWith('.js')));

  await Promise.all(files.map(file => new Promise(async resolve => {
    const absPath = path.join(pathFiles, file.name);
    if (file.isDirectory()) {
      await readFiles(absPath, kindData, sandbox);
    } else {
      const exported = await loadScript(absPath, { ...sandbox, require});
      kindData.push(exported);
    };
    resolve();
  })));
};

const initMetadata = (metadata) => {
  const keys = ['app', 'config', 'kind', 'modules', 'services'];
  for (const key of keys) {
    if (!(key in metadata)) metadata[key] = {};
  };
};


module.exports = async (sandbox, kind) => {
  const { metadata } = sandbox;
  initMetadata(metadata);
  const { app } = metadata;
  app[`${kind}Path`] = path.join(app.appPath, kind);
  const kindData = [];

  await readFiles(app[`${kind}Path`], kindData, sandbox);

  for (const exported of kindData) {
    if (!exported.active) continue;
    const meta = exported.metadata;
    for (const keyMetadata of Object.keys(meta)) {
      const data = meta[keyMetadata];
      if (typeof data !== "object") continue;
      if (!(keyMetadata in metadata)) metadata[keyMetadata] = {};

      for (const key of Object.keys(data)) {
        if (key in metadata[keyMetadata])
          throw new Error(`key ${key} is already exists in ${keyMetadata}`);
        metadata[keyMetadata][key] = data[key];
      };
    };
  };
  return metadata;
};
