import fs from 'fs';
import path from 'path';
import packager from 'electron-packager';
// elctron-compile api not setup for es6 modules, need to use require;
const compiler = require('electron-compile');

const paths = {
  packageJson: path.join(__dirname, '../package.json'),
  cache: path.join(__dirname, '../app')
};

console.log(paths);

const packageJson = JSON.parse(fs.readFileSync(paths.packageJson, 'utf8'));
const nodeModuleIgnores = [
  'electron-compile/node_modules/electron-compilers',
  ...Object.keys(packageJson.devDependencies),
];

compiler.init(paths.cache);
console.log(paths.cache);
compiler.compileAll('app');

fs.writeFileSync(
  path.join(paths.cache, 'settings.json'),
  JSON.stringify(compiler.collectCompilerInformation())
);

packager({
  dir: '.',
  name: packageJson.name,
  platform: 'darwin',
  arch: 'x64',
  version: require('electron-prebuilt/package.json').version,
  overwrite: true,
  prune: true,
  ignore: new RegExp(`node_modules/(${nodeModuleIgnores.join('|')})`),
  // asar: true,
  out: 'dist'
}, (err, appPath) => {
  if (err) return console.error(err);
  console.log(appPath);
});
