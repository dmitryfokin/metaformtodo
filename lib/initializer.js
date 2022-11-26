'use strict';

module.exports = async (appSandbox) => {
  const { metadata, rootPath, node, console } = appSandbox;
  const { config } = metadata;
  const { initializers } = config;
  const initializersPath = node.path.join(rootPath, 'initializers');

  const inits = [];

  for (const initializerConfig of initializers) {
    const { initializerScript } = initializerConfig;
    const initializerPath = node.path.join(initializersPath, initializerScript);

    inits.push({module: require(initializerPath), initializerConfig,});
  };

  for (const i of inits) {
    console.log(`before: initialize ${i.initializerConfig.name}`);
    if (i.module.beforeInit) 
      await i.module.beforeInit(appSandbox, i.initializerConfig);
  };
  for (const i of inits) {
    console.log(`initialize ${i.initializerConfig.name}`);
    if (i.module.init) 
      await i.module.init(appSandbox, i.initializerConfig);
  };
  for (const i of inits) {
    console.log(`after: initialize ${i.initializerConfig.name}`);
    if (i.module.afterInit) 
      await i.module.afterInit(appSandbox, i.initializerConfig);
  };
};
