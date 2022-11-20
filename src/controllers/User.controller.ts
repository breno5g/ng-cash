import { NextFunction, Request, Response } from 'express';
import { IUser } from '../interfaces/IUser';
import IUserController from '../interfaces/IUserController';
import IUserService from '../interfaces/IUserService';

class UserController implements IUserController {
  private readonly service: IUserService;
  static create: any;
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
      const { authorization: token } = req.headers;
      const { username } = req.body;
      const response = await this.service.getBalance(username, token as string);
      return res.status(200).json({ data: response });
    } catch (error: any) {
      next(error);
    }
  }
}

export { UserController };
