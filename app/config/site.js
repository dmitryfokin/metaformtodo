
const active = true;
if (active) {
  const siteConfig = {
    port: '8200',
    pathStatic: 'static',
  };

  const runServise = () => {
    const staticServer = modules.staticServer({ ...siteConfig });
    const { app } = metadata;
    const pathStatic = node.path.join(app.appPath, siteConfig.pathStatic);
    staticServer(pathStatic, siteConfig.port, console);
  };

  ({
    active,
    metadata: {
      config: {
        site: siteConfig,
      },
      // kinds: {
      //   site: {
      //     kindPath: 'static',
      //   },
      // },
      services: {
        staticServer: {
          fn: () => {
            runServise();
          },
        },
      },
    }
  });
} else { ({ active }) };
