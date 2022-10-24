
const fileName = 'db.js';
const configName = 'pg';
const { modulesPath } = metadata.app;
const filePath = node.path.join(modulesPath, fileName);

({
  metadata: {
    config: {
      pg: {
        host: '127.0.0.1',                                                                                                  
        port: 5432,                                                                                                         
        database: 'example',                                                                                                
        user: 'marcus',                                                                                                     
        password: 'marcus',                                                                                                 
      }
    },
    modules: {
      db: {
        name: 'db',
        kindMount: 'fn',
        fileName: fileName,
        fn: config => require(filePath)(config[configName]),
        mountPoint: 'db',
      },
    },
  }
});
