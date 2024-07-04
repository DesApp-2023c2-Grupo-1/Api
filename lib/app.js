/* eslint-disable no-console */
import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import logger from 'morgan';
import routes from './routes';
import { Server } from 'socket.io';

const app = express();
const http = require('https');
const server = http.createServer(app);
const port = process.env.PORT || 3005;

const io = new Server(server, {
  cors: { origin: '*' },
});

/**
 * Get port from environment and store in Express.
 */
app.set('io', io);
app.set('port', port);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(cors());
app.use(compression());

app.use('/', routes);

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

export default { app, io };
