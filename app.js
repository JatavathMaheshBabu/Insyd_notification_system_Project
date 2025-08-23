import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import eventsRouter from './routes/events.js';
import notificationsRouter from './routes/notifications.js';
import usersRouter from './routes/users.js';
import healthRouter from './routes/health.js';

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/events', eventsRouter);
app.use('/api/notifications', notificationsRouter);
app.use('/api/users', usersRouter);
app.use('/api/health', healthRouter);

export default app;
