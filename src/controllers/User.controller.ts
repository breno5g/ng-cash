import { NextFunction, Request, Response } from 'express';
import { IUser } from '../interfaces/IUser';
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
    } catch (error) {
      next(error);
    }
  }
}

export { UserController };
