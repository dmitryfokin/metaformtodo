
const active = true;
if (active) {
  const loadStatic = (config) => {
    const modulePath = 'static.js';
    const { modulesPath } = metadata.app;
    const filePath = node.path.join(modulesPath, modulePath);
    return require(filePath);
  };

  ({
    active,
    metadata: {
      modules: {
        static: {
          name: 'static',
          kindMount: 'fn',
          fn: () => config => loadStatic(config),
          mountPoint: 'staticServer',
        },
      },
    }
  });
} else { ({ active }) };
