/* eslint "import/no-dynamic-require": 0 */
var path = require('path');

var nodeModules = path.join(__dirname, '..');
var fragments = nodeModules.split(path.sep);
fragments = fragments.map(function (f) {
  if (f === 'app.asar') {
    return 'app.asar.unpacked';
  }
  return f;
});
nodeModules = fragments.join(path.sep);

module.exports = require(path.join(nodeModules, 'electron/'));
