# electron-prebuilt-path

Find the Electron binaries from anywhere, whether running in Node or Electron.
Defers to [`electron-prebuilt`](https://github.com/electron-userland/electron-prebuilt#programmatic-usage) for all the hard work.

## Usage

```javascript
var electronPath = require('electron-prebuilt-path')
var proc = require('child_process')

// will print something similar to /Users/maf/.../Electron, even if run in Electron
console.log(electronPath)

// spawn Electron, even if run in Electron
var child = proc.spawn(electronPath)
```
