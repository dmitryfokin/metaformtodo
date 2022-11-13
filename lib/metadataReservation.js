'use strict';

module.exports = async (appSandbox) => {
  const { metadata } = appSandbox;
  const { config } = metadata;
  const { metadataInitializers } = config;

  for (const key of Object.keys(metadataInitializers)) {
    const metadataInitConfig = metadataInitializers[key];
    const metadataConfig = typeof metadataInitConfig.config === 'string'
      ? config[metadataInitConfig.config]
      : metadataInitConfig.config;

    metadata.mount(metadataConfig.mountPointMetadata, {});
  };
};
