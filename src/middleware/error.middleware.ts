import { Request, Response, NextFunction } from 'express';
import BaseError from '../errors/base-error';
import { Prisma } from '@prisma/client';
import { AppError } from '../errors/app-error';
import { logger } from '../config/logger';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  let error = err;
  if (!(err instanceof BaseError)) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      error = new AppError('Database Error');
    } else {
      error = new AppError(err.message || 'Unhandled Error');
    }
  }

  const serialized = (error as BaseError).serialize();

  logger.error({
    path: req.path,
    method: req.method,
    ...serialized,
    requestId: req.headers['x-request-id'] || 'N/A',
  });

  res.status(serialized.statusCode).json(serialized);
};

export default errorHandler;
