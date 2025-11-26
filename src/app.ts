import express, {Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import pinoHttp from 'pino-http';
import { logger } from './config/logger.js';

const app = express();

app.use(pinoHttp({ logger }));

app.use(helmet()); 
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req: Request, res: Response) => {
    res.send("Im Working")
})

export default app;
