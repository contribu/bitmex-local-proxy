'use strict';

if (process.argv.length < 2) {
  console.error('Usage: `node proxy.js PORT`');
  return process.exit(1);
}

const http = require('http');
const https = require('https');
const httpProxy = require('http-proxy');

const apiURL = 'https://www.bitmex.com';
const port = process.argv[2];
const agent = new https.Agent({ keepAlive: true });
const proxy = httpProxy.createProxyServer({ agent });

const server = http.createServer(function(req, res) {
  // API validates origin and referer to prevent certain types of csrf attacks, so delete them
  delete req.headers['origin'];
  delete req.headers['referer'];
  res.setHeader('Access-Control-Allow-Origin', '*');

  req.url = '/api/v1' + req.url;
  proxy.web(req, res, {
    changeOrigin: true,
    target: apiURL
  });
});

server.keepAliveTimeout = 90 * 1000

server.listen(port);
console.log('Started BitMEX proxy on port', port);
