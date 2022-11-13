'use strict';

const vm = require('node:vm');
const fsp = require('node:fs').promises;
const path = require('node:path');

class VMScript {
  constructor({ src, code, script, filePath }) {
    this.src = src;
    this.code = code;
    this.script = script;
    this.filePath = filePath;
    this.exportedDefault = null;
  }

  createContext(context = {}, freeze = false) {
    const cntxt = freeze ? Object.freeze({ ...context }) : context;
    return vm.createContext(cntxt);
  }

  async runInContext(sandbox = undefined) {
    const cntxt = sandbox ? this.createContext(sandbox) : this.createContext({});
    const exported = await this.script.runInContext(cntxt);
    return exported;
  }

  async createExportedDefault(context) {
    this.exportedDefault = await this.runInContext(context);
  }

  static async create(filePath, context) {
    const src = await fsp.readFile(filePath, 'utf8');
    const code = `'use strict';\n${src}`;
    const script = new vm.Script(code);

    const scrpt = new VMScript({ src, code, script, filePath });
    await scrpt.createExportedDefault();
    return scrpt;
  }
};

const readFiles = async (pathFiles, arr, context = undefined, arrPath = []) => {
  const files = Array.from(
    await fsp.readdir(pathFiles, { withFileTypes: true })
  ).filter(file => !(file.name.startsWith('.') || !file.name.endsWith('.js')));

  await Promise.all(files.map(file => new Promise(async resolve => {
    const absPath = path.join(pathFiles, file.name);
    if (file.isDirectory()) {
      arrPath.push(file.name);
      await readFiles(absPath, kindData, sandbox, arrPath);
    } else {
      const script = await VMScript.create(absPath, context);
      const nameScript = path.basename(file.name, '.js');
      arr.push({ name: nameScript, script, arrPath });
    };
    resolve();
  })));
};

module.exports = async (pathFiles, context = undefined) => {
  const scripts = [];
  await readFiles(pathFiles, scripts, context);
  return scripts;
};
