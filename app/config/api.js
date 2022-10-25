
const active = true;
if (active) {

  const runServise = () => {
    console.debug(transport);
    // transport()


    // const transportPath = 'transport';
    // const { modulesPath } = metadata.app;

    // const filePath = node.path.join(modulesPath, transportPath, `${config.transport}.js`);
    // return require(filePath);
  };

  ({
    active,
    config:{
      transport: 'ws',
      port: '8201',
    },
    metadata: {
      kinds: {
        pathKind: 'api',
        mountPoint: 'routing',
      },
      service: {
        fn: async () => {
          runServise();
        },
      },
    }
  });
} else { ({ active }) };
