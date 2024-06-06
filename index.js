const app = require('./app');
const http = require('http'); //trae protocolos de internet

const server = http.createServer(app); //para correr el servidor

server.listen(3003, () => {
  console.log('el servidor esta corriendo en el puerto 3003');
  console.log('http://localhost:3003');
});
