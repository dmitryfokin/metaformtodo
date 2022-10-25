'use strict';

// const typesMount = {
//   fn: async (mountPoint, fn) => fn(metadata.config)
//   require: require(moduleData.filePath)
//   npm: require(moduleData.npmName)
//   module: moduleData.module
// };

module.exports = async (sandbox) => {
  const { modules, metadata } = sandbox;

  for (const key of Object.keys(metadata.modules)) {
    const moduleData = metadata.modules[key];
    const { kindMount, mountPoint } = moduleData;
    if (kindMount === 'fn')
      modules[mountPoint] = await moduleData.fn(metadata.config);
    else if (kindMount === 'require')
      modules[mountPoint] = require(moduleData.filePath);
    else if (kindMount === 'npm')
      modules[mountPoint] = require(moduleData.npmName);
    else if (kindMount === 'module')
      modules[mountPoint] = moduleData.module;
  };
};
