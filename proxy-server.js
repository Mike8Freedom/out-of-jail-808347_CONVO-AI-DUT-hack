const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = 8080;

const MIME = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};

const server = http.createServer(async (req, res) => {
  // CORS headers for all responses
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Proxy: /agora-api/* -> https://api.agora.io/*
  if (req.url.startsWith('/agora-api/')) {
    const targetPath = req.url.replace('/agora-api/', '/');
    const targetUrl = 'https://api.agora.io' + targetPath;

    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      const url = new URL(targetUrl);
      const options = {
        hostname: url.hostname,
        path: url.pathname + url.search,
        method: req.method,
        headers: {
          'Content-Type': 'application/json',
        }
      };

      if (req.headers.authorization) {
        options.headers['Authorization'] = req.headers.authorization;
      }

      if (body) {
        options.headers['Content-Length'] = Buffer.byteLength(body);
      }

      const proxyReq = https.request(options, (proxyRes) => {
        res.writeHead(proxyRes.statusCode, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        });
        proxyRes.pipe(res);
      });

      proxyReq.on('error', (e) => {
        console.error('Proxy error:', e.message);
        res.writeHead(502);
        res.end(JSON.stringify({ error: e.message }));
      });

      if (body) proxyReq.write(body);
      proxyReq.end();
    });
    return;
  }

  // Static files
  let filePath = path.join(__dirname, req.url === '/' ? 'noemi-widget.html' : req.url);
  const ext = path.extname(filePath);
  const contentType = MIME[ext] || 'application/octet-stream';

  try {
    const data = fs.readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  } catch (e) {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Widget: http://localhost:${PORT}/noemi-widget.html`);
  console.log(`Agora proxy: /agora-api/* -> https://api.agora.io/*`);
});
