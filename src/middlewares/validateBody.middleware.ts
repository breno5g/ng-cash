import { NextFunction, Request, Response } from 'express';
import { Schema } from 'joi';
const bodyValidator = (
  schema: Schema,
  req: Request,
  res: Response,
  next: NextFunction): any => {
  // console.log(`Status: ${err.status}, Message: ${err.message}, stack: ${err.stack}`);
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  next();
};

export default bodyValidator;
