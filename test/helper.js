/*global global, require*/
var exec = require('child_process').exec,
    path = require('path');


global.assert = require('assert');
global.sinon = require('sinon');

for (var key in global.sinon.assert) {
  global.assert[key] = global.sinon.assert[key];
}

/**
 * Wait until a boolean function returns true.
 *
 * @param {Function} test some boolean function.
 * @param {Function} callback invoke when test passes.
 */
global.waitFor = function(test, callback) {
  (function runTest() {
    if (test()) {
      return callback && callback();
    }

    setTimeout(runTest, 100);
  })();
};

/**
 * Shell out to npm-mirror.
 */
global.runNpmMirror = function(master, manifests, hostname, root, callback) {
  exec([
    path.resolve(__dirname, '..', 'bin', 'npm-mirror'),
    '--master', master,
    '--manifests', manifests.join(','),
    '--hostname', hostname,
    '--root', root
  ].join(' '), callback);
};
