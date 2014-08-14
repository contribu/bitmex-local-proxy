'use strict';

if (process.argv.length < 2) {
  console.error("Usage: `node proxy.js PORT`");
  return process.exit(1);
}

var bouncy = require('bouncy');
var port = process.argv[2];

bouncy(function(req, res, bounce) {
  console.log('got req', req.url);
  bounce("https://www.bitmex.com:443/api/v1" + req.url);
}).listen(port);

console.log("Started BitMEX proxy on port", port);