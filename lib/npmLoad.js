'use strict'

module.exports = async (appSandbox) => {
  const { path } = appSandbox.node;
  const packageFile = require(path.join(appSandbox.rootPath, 'package.json'));
  if (packageFile.dependencies) {
    for (const packageName of Object.keys(packageFile.dependencies)) {
      appSandbox.npm[packageName] = require(packageName);
    };
  };
};
