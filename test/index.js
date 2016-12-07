/* eslint "unicorn/no-process-exit": 0, "import/no-unresolved": 0 */
var path = require('path');
var fs = require('fs');
var electronPath = require('electron-prebuilt-path');

console.log('Electron path from', process.versions.electron ? 'Electron' : 'Node', 'via electron-prebuilt-path:', electronPath);
if (typeof electronPath !== 'string') {
  console.error('Path was not a string!');
  process.exit(1);
}
if (path.normalize(path.resolve(electronPath)) !== path.normalize(path.resolve(fs.readFileSync('path.txt', {encoding: 'utf8'})))) {
  console.error('Path was the wrong string!');
  process.exit(1);
}
process.exit(0);
