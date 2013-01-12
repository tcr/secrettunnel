var spawn = require('child_process').spawn
  , util = require('util')
  , EventEmitter = require('events').EventEmitter;

var nconf = require('nconf')
  , uuid = require('node-uuid');

nconf.file('.secrettunnel');

module.exports = function (port, callback) {
  if (typeof port == 'function') callback = port, port = null;
  callback = callback || function () { };
  port = port || nconf.get('port') || 5000;
  nconf.set('port', port);

  var name = uuid.v1();

  if (!nconf.get('tunnel')) {
    nconf.set('tunnel', name);
    nconf.save(startTunnel);
  } else {
    name = nconf.get('tunnel');
    startTunnel();
  }

  function clone (arg) {
    return JSON.parse(JSON.stringify(arg));
  }

  function augment (a, b) {
    for (var key in b) {
      a[key] = b[key];
    }
    return a;
  }

  function startTunnel () {
    var lt = spawn('localtunnel-beta', ['-n', name, port], {
      env: augment(clone(process.env), {'PYTHONUNBUFFERED': 'x'})
    });
    lt.stdout.on('data', function (data) {
      data = String(data);
      var look = 'is now accessible from ';
      if (data.indexOf(look) > -1) {
        var url = data.substr(data.indexOf(look) + look.length).replace(/^\s+| ...\s+$/g, '');
        callback(null, url, name, port);
      } else {
        callback(data, null);
      }
    });

    lt.on('exit', function (code) {
      if (code) {
        callback(code, null);
      }
    })
  }
};