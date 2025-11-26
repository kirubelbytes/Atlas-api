import 'dotenv/config';
import app from './app.js';
import { env } from './config/env.js';
import { connectDb } from './config/database.js';
import { logger } from './config/logger.js';

const startServer = async () => {
  await connectDb();

  app.listen(Number(env.PORT), () => {
    logger.info(`Server running on port ${env.PORT}`);
  });
};

startServer();
