var shell = require('shelljs');

shell.set('-e');

function waitForElectronComplete() {
  for (var i = 0; i < 60; i++) {
    if (shell.test('-f', 'electron-done')) {
      return;
    }
  }
}

function cleanupElectron() {
  if (shell.test('-f', 'electron-done')) {
    shell.rm('electron-done');
  }
  if (shell.test('-f', 'electron-failed')) {
    shell.rm('electron-failed');
    throw new Error('Electron failed!');
  }
}

function awaitElectron() {
  waitForElectronComplete();
  cleanupElectron();
}

shell.echo('\n*** Reinstalling from scratch\n');
if (shell.test('-d', 'node_modules')) {
  shell.rm('-rf', 'node_modules');
}
shell.exec('npm install');

shell.echo('\n*** Running simple tests\n');
if (shell.test('-f', 'path.txt')) {
  shell.rm('path.txt');
}
shell.exec('node get-path.js');
shell.exec('node test.js');
shell.exec('npm run electron -- test-in-electron.js');
cleanupElectron();

shell.echo('\n*** Running packaged test\n');
shell.exec('npm run pack');
var executable;
if (shell.test('-d', 'dist/linux-unpacked')) {
  shell.cd('dist/linux-unpacked');
  executable = './electron-prebuilt-path-test';
} else if (shell.test('-d', 'dist/win-unpacked')) {
  shell.cd('dist/win-unpacked');
  executable = 'electron-prebuilt-path-test.exe';
}
shell.cp('../../get-path.js', 'resources/app.asar.unpacked/');
shell.cd('resources/app.asar.unpacked/');
shell.exec('node get-path.js');
shell.mv('path.txt', '../../');
shell.cd('../../');
shell.exec(executable);
awaitElectron();
shell.rm('-rf', 'dist');
