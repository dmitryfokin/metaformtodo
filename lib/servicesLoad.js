'use strict';

module.exports = async (sandbox) => {
  const { metadata } = sandbox;
  const { services } = metadata;

  for (const key of Object.keys(services)) {
    const serviceData = services[key];
    await serviceData.fn();
  };
};
