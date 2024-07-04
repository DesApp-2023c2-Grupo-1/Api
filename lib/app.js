/* eslint-disable no-console */
import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import logger from 'morgan';
import routes from './routes';
import { Server } from 'socket.io';

const http = require('https');
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3005;
const ioPort = process.env.IO_PORT || 3001;

const io = new Server(server, {
  cors: {
    origin: 'https://api-tn9p.onrender.com',
    credentials: true,
  },
});

server.listen(ioPort);

export default io;

/**
 * Get port from environment and store in Express.
 */

app.set('port', port);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(cors());
app.use(compression());

app.use('/', routes);

module.exports = app;
