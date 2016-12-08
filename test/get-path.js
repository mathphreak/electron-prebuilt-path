var electronPath = require('electron');

if (typeof electronPath === 'string') {
  console.log('Electron path from electron-prebuilt:', electronPath);
  var fs = require('fs');
  fs.writeFileSync('path.txt', electronPath);
}
