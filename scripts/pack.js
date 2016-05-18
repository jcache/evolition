import fs from 'fs';
import path from 'path';
import packager from 'electron-packager';

const compiler = require('electron-compile');

const paths = {
  mainPath: path.join(__dirname, '../'),
  packageJson: path.join(__dirname, '../package.json'),
  appMainPath: path.join(__dirname, '../src/main'),
  cachePath: path.join(__dirname, '../.cache'),
  appPath: path.join(__dirname, '../src'),
};

const packageJson = JSON.parse(fs.readFileSync(paths.packageJson, 'utf8'));

const nodeModuleIgnores = [
  'electron-compile/node_modules/electron-compilers',
  ...Object.keys(packageJson.devDependencies),
];

compiler.init(paths.mainPath, paths.appMainPath, false);
// compiler.compile('app')

// packager({
//   dir: '.',
//   name: packageJson.name,
//   platform: 'darwin',
//   arch: 'x64',
//   version: require('electron-prebuilt/package.json').version,
//   overwrite: true,
//   prune: true,
//   // asar: true,
//   out: 'dist'
// }, (err, appPath) => {
//   if (err) return console.error(err);
//   console.log(appPath);
// });
