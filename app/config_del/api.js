
const active = true;
if (active) {
  const apiConfig = {
    transport: 'ws',
    port: '8201',
  };

  const runServise = () => {
    const transport = modules.transport(apiConfig);
    transport(metadata.routing, apiConfig.port, console);
  };

  ({
    active,
    metadata: {
      config: {
        api: apiConfig,
      },
      kinds: {
        api: {
          kindPath: 'api',
        },
      },
      services: {
        api: {
          fn: () => {
            runServise();
          },
        },
      },
    }
  });
} else { ({ active }) };
