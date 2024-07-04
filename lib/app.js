/* eslint-disable no-console */
import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import logger from 'morgan';
import routes from './routes';
const app = express();
const http = require('https');
const server = http.createServer();
const port = process.env.PORT || 3005;

const io = require('socket.io')(server, {
  cors: { origin: '*' },
});

server.listen(3001);

export default io;

/**
 * Get port from environment and store in Express.
 */

app.set('port', port);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Reemplaza con tu dominio o '*' para permitir desde cualquier origen
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(cors());
app.use(compression());

app.use('/', routes);

module.exports = app;
