const http = require('http');
const fs = require('fs');
const path = require('path');

// Create a local server to receive data from
const server = http.createServer();
server.listen(8080, () => 
    console.log('Server is listening on port: 8080')
);

const serveFile = (filePath, res) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('File not found');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  };

// Listen to the request event
server.on('request', (req, res) => {
    if (req.url === '/') {
      serveFile(path.join(__dirname, 'index.html'), res);
    } else if (req.url === '/about') {
      serveFile(path.join(__dirname, 'about.html'), res);
    } else if (req.url === '/contact-me') {
      serveFile(path.join(__dirname, 'contact-me.html'), res);
    } else {
      serveFile(path.join(__dirname, '404.html'), res);
    }  
});

