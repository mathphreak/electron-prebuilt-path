/* eslint "import/no-unresolved": 0 */
var path = require('path');
var fs = require('fs');
var electronPath = require('electron-prebuilt-path');

module.exports = function () {
  console.log('Electron path from', process.versions.electron ? 'Electron' : 'Node', 'via electron-prebuilt-path:', electronPath);
  if (typeof electronPath !== 'string') {
    throw new Error('Path was not a string!');
  }
  var realPath;
  try {
    realPath = path.normalize(path.resolve(fs.readFileSync('path.txt', {encoding: 'utf8'})));
  } catch (err) {
    console.log('Couldn\'t find a realPath to compare to, skipping');
  }
  if (realPath !== undefined) {
    if (path.normalize(path.resolve(electronPath)) === realPath) {
      console.log('Path was the right string!');
    } else {
      throw new Error('Path was the wrong string!');
    }
  }
};

if (require.main === module) {
  module.exports();
}
