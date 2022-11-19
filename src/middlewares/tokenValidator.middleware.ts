import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../errors';
import JWT from '../helpers/jwt.class';

const tokenValidator = (
  req: Request,
  _res: Response,
  next: NextFunction): any => {
  const { authorization } = req.headers;

  const isValid = new JWT().validateToken(authorization as string);

  if (!isValid) {
    throw new UnauthorizedError();
  }

  next();
};

export default tokenValidator;
