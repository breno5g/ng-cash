import { NextFunction, Request, Response } from 'express';
import { IUser, IUserWithToken } from '../interfaces/IUser';
import IUserService from '../interfaces/IUserService';

class UserController {
  private readonly service: IUserService;
  constructor (service: IUserService) {
    this.service = service;
  }

  public async create (req: Request, res: Response, next: NextFunction): Promise<any | null> {
    try {
      const { username, password } = req.body as IUser;
      const response = await this.service.create({ username, password });
      return res.status(201).json({ message: response });
    } catch (error: any) {
      next(error);
    }
  }

  public async login (req: Request, res: Response, next: NextFunction): Promise<any | null> {
    try {
      const { username, password } = req.body as IUser;
      const response = await this.service.login({ username, password });
      return res.status(200).json({ ...response });
    } catch (error: any) {
      next(error);
    }
  }

  public async getBalance (req: Request, res: Response, next: NextFunction): Promise<any | null> {
    try {
      const { username, token } = req.body as IUserWithToken;
      const response = await this.service.getBalance(username, token);
      return res.status(200).json({ data: response });
    } catch (error: any) {
      next(error);
    }
  }
}

export { UserController };
