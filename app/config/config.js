({
  config: {
    app: {
      name: 'TODO List',
      developer: 'https://github.com/dmitryfokin',
    },
    logger: {
      logPath: './log',
    },
    api: {
      transport: 'ws',
      port: '8201',
      mountPoint: 'routing',
    },
    // api: [{
    //   transport: 'ws',
    //   port: '8201',
    //   mountPoint: 'routing',
    // },
    // {
    //   transport: 'http',
    //   port: '8282',
    //   mountPoint: 'routing',
    // }],
    site: {
      port: '8280',
      staticPath: 'static',
    },
    // site: [
    //   {
    //     port: '8280',
    //     staticPath: 'static',
    //   },
    //   {
    //     port: '8288',
    //     staticPath: 'static2',
    //   },
    // ],
    db: {
      host: '127.0.0.1',
      port: 5432,
      database: 'example',
      user: 'marcus',
      password: 'marcus',
    },
    initializers: [
      {
        name: 'logger',
        initializerScript: 'loggerInit.js',
        config: 'logger',
        mountPoint: 'console',
      },
      {
        name: 'db',
        initializerScript: 'dbInit.js',
        config: 'db',
        mountPoint: 'db',
      },
      {
        name: 'appModules',
        initializerScript: 'appModulesInit.js',
        mount: [
          {
            path: 'api',
            mountPointMetadata: 'routing',
          },
        ],
      },
      {
        name: 'api',
        initializerScript: 'apiInit.js',
        config: 'api',
      },
      {
        name: 'site',
        initializerScript: 'staticInit.js',
        config: 'site',
      },
    ],
  },
});
