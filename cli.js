#!/usr/bin/env node
var secrettunnel = require('./');

if (process.argv.length < 3) {
  console.error('Usage: secrettunnel <port>')
  process.exit(1);
}

var port = process.argv[2];
secrettunnel(parseInt(port), function (err, url, name, port) {
  if (err) {
    console.error('Error encountered:', err);
    process.exit(1);
  } else {
    console.log('Tunnel connect to port', port)
    console.log(url);
  }
});