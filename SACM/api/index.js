require('dotenv').config();
const Server = require("./src/server/server.js");

const server = new Server();

server.listen();

