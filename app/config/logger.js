
const active = true;
if (active) {
  const fileName = 'logger.js';
  const configName = 'logger';
  const { modulesPath } = metadata.app;
  const filePath = node.path.join(modulesPath, fileName);

  ({
    active,
    metadata: {
      config: {
        logger: {
          logPath: './log',
        }
      },
      modules: {
        logger: {
          name: 'logger',
          kindMount: 'fn',
          fileName: fileName,
          fn: config => require(filePath)(config[configName]),
          mountPoint: 'console',
        },
      },
      // modules: {
      //   pino: {
      //     name: 'pino',
      //     type: 'module',
      //     module: 'pino/pino.js',
      //     mountPoint: 'console',
      //   },
      // },
      // modules: {
      //   name: 'console',
      //   type: 'system',
      //   module: console,
      //   mountPoint: 'console',
      // },
    }
  });
} else { ({ active }) };
