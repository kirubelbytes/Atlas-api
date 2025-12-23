import { PrismaClient } from '@prisma/client';
import { logger } from './logger.js';

export const prismaClient = new PrismaClient();

export const connectDb = async () => {
  try {
    await prismaClient.$connect();
    logger.info('Database connected successfully');
  } catch (error) {
    logger.error('Failed to connect database');
    process.exit(1);
  }
};

export const disconnectDb = async () => {
  try {
    await prismaClient.$disconnect();
    logger.info('Database disconnected');
  } catch (error) {
    logger.error('Error disconnecting database');
  }
};
