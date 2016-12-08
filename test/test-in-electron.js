var app = require('electron').app;
var touch = require('shelljs').touch;
var test = require('./test');

try {
  test();
} catch (err) {
  console.error(err);
  touch('electron-failed');
}

touch('electron-done');
app.exit();
