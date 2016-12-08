var shell = require('shelljs');
var isCI = require('is-ci');

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
if (!isCI && shell.test('-d', 'node_modules')) {
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
var unpackedPath = 'resources/app.asar.unpacked';
if (shell.test('-d', 'dist/linux-unpacked')) {
  shell.cd('dist/linux-unpacked');
  executable = './electron-prebuilt-path-test';
} else if (shell.test('-d', 'dist/win-unpacked')) {
  shell.cd('dist/win-unpacked');
  executable = 'electron-prebuilt-path-test.exe';
} else if (shell.test('-d', 'dist/mac')) {
  shell.cd('dist/mac');
  executable = 'electron-prebuilt-path-test.app/Contents/MacOS/electron-prebuilt-path-test';
  unpackedPath = 'electron-prebuilt-path-test.app/Contents/Resources/app.asar.unpacked';
}
shell.cp('../../get-path.js', unpackedPath);
shell.pushd(unpackedPath);
shell.exec('node get-path.js');
shell.popd();
shell.mv(unpackedPath + '/path.txt', '.');
shell.exec(executable);
awaitElectron();
shell.rm('-rf', 'dist');
