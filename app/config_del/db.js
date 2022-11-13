
const active = true;
if (active) {
  const pg = {
    host: '127.0.0.1',
    port: 5432,
    database: 'example',
    user: 'marcus',
    password: 'marcus',
  };

  const fileName = 'db.js';
  //const configName = 'pg';
  const { modulesPath } = metadata.app;
  const filePath = node.path.join(modulesPath, fileName);
  const db = require(filePath)(pg);

  ({
    active,
    metadata: {
      config: {
        pg: { ...pg },
      },
      modules: {
        db: {
          name: 'db',
          kindMount: 'module',
          fileName: fileName,
          module: db,
          mountPoint: 'db',
        },
        // db: {
        //   name: 'db',
        //   kindMount: 'fn',
        //   fileName: fileName,
        //   fn: config => require(filePath)(config[configName]),
        //   mountPoint: 'db',
        // },
      },
    }
  });
} else { ({ active }) };
