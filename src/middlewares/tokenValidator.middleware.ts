import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../errors';
import JWT from '../helpers/jwt.class';
import { IUserWithToken } from '../interfaces/IUser';

const tokenValidator = (
  req: Request,
  _res: Response,
  next: NextFunction): any => {
  const { token } = req.body as IUserWithToken;

  const isValid = new JWT().validateToken(token);

  if (!isValid) {
    throw new UnauthorizedError();
  }

  next();
};

export default tokenValidator;
