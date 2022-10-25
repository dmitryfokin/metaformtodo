
const active = true;
if (active) {

  const loadTransport = (config) => {
    const transportPath = 'transport';
    const { modulesPath } = metadata.app;

    const filePath = node.path.join(modulesPath, transportPath, `${config.transport}.js`);
    return require(filePath);
  };

  ({
    active,
    metadata: {
      modules: {
        transport: {
          name: 'transport',
          kindMount: 'fn',
          fn: () => config => loadTransport(config),
          mountPoint: 'transport',
        },
      },
    }
  });
} else { ({ active }) };
