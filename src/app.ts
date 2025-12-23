import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import pinoHttp from 'pino-http';
import { logger } from './config/logger.js';
import errorHandler from './middleware/error.middleware.js';
import rootRouter from './routes/index.js';

const app = express();

app.use(pinoHttp({ logger }));

app.use(helmet());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(rootRouter)

app.use(errorHandler);
export default app;
