'use strict';

const vm = require('node:vm');
const fsp = require('node:fs').promises;

module.exports = async (filePath, sandbox = {}) => {
  const src = await fsp.readFile(filePath, 'utf8');
  const code = `'use strict';\n${src}`;
  const script = new vm.Script(code);
  const context = vm.createContext(Object.freeze({ ...sandbox }));
  const exported = script.runInContext(context);
  return exported;
};

