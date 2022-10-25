
const active = true;
if (active) {
  const apiConfig = {
    transport: 'ws',
    port: '8201',
  };

  const runServise = () => {
    const { config } = metadata;
    const transport = modules.transport({ ...config.api });
    transport(metadata.routing, config.api.port, console);
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
