require('./database/database');
const express = require('express');
const app = express();
const socketServer = require('http').createServer(app);
const { setupSocket } = require('./socket');
const routes = require('./routes');
const cors = require('cors');
setupSocket(socketServer);

app.use(cors())
app.use(express.json());
app.use(routes);

module.exports = app;
