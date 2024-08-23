import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';

export const errorHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err.message, {
    metadata: {
      stack: err.stack,
      method: req.method,
      url: req.url,
    },
  });
  const statusCode = err.statusCode || 500;
  const message = err.message || 'internal server error';

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
