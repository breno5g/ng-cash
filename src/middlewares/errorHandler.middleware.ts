import { NextFunction, Request, Response } from 'express';
import { InternalServerError } from '../errors';

const ErrorHandler = async (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction): Promise<any> => {
  // console.log(`Status: ${err.status}, Message: ${err.message}, stack: ${err.stack}`);

  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }

  const internalError = new InternalServerError();
  return res.status(internalError.status).json({ message: internalError.message });
};

export default ErrorHandler;
