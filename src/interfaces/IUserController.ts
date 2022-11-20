import { NextFunction, Request, Response } from 'express';

interface IUserController {
  create(req: Request, res: Response, next: NextFunction): Promise<any>
  login(req: Request, res: Response, next: NextFunction): Promise<any>
  getBalance(req: Request, res: Response, next: NextFunction): Promise<any>
}

export default IUserController;
