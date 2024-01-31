const args = process.argv.slice(2);
const fs = require('fs');
// const fs = require('fs').promises;
const HOST = new URL(args[0]).host;

const PATH = args[1];
const PORT = 80;

console.log("constants: ", HOST, PATH);

const net = require('net');
const conn = net.createConnection({
  host: HOST,
  port: PORT
});

/**
 * SETUP
 * Our usual client setup code
 * Connect to example.edu website's HTTP server using our TCP library
 * HTTP servers typically run on port 80
 */
conn.setEncoding('UTF8');
conn.on('connect', () => {
  console.log("Connected to server!");
  conn.write(`GET / HTTP/1.1\r\n`);
  conn.write(`Host: ${HOST}\r\n`);
  conn.write(`\r\n`);
});


/**
 * HTTP Response
 * After request is made, the HTTP server should send us HTTP data via our TCP connection
 * Print the data into index.html file, and end the connection
 */

conn.on('data', (data) => {
  fs.writeFile(PATH, data, function(err) {
    if (err) throw err;
    const stats = fs.statSync(PATH);
    const fileSizeInBytes = stats.size;
    console.log(`Downloaded and saved ${fileSizeInBytes} bytes to ${PATH}`);
  });

  conn.end();
});