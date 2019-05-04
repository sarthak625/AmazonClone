/**
 *  Import libraries  
 */ 
const http = require('http');
const app = require('../../app');

/**
 * Create the server
 */
const server = http.createServer(app);

/**
 * Configure port
 */
let port = process.env.PORT || 3000;
app.set('port', port );
server.listen(port);

/**
 * Server state handlers
 */ 
server.on('listening', () => console.log(`Server running on port : ${server.address().port}`));
server.on('error', err => console.log(err) );
server.on('close', () => console.log('Server stopped') );