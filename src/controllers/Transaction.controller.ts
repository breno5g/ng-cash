import { NextFunction, Request, Response } from 'express';
import ITransactionService from '../interfaces/ITransactionService';

class TransactionController {
  private readonly service: ITransactionService;
  constructor (service: ITransactionService) {
    this.service = service;
  }

  public async create (req: Request, res: Response, next: NextFunction): Promise<any | null> {
    try {
      const { authorization: token } = req.headers;
      const { accountToDebit, transactionValue } = req.body;
      const response = await this.service.create(accountToDebit, transactionValue, token as string);
      return res.status(201).json({ message: response });
    } catch (error: any) {
      next(error);
    }
  }

  public async getTransactions (req: Request, res: Response, next: NextFunction): Promise<any | null> {
    try {
      const { authorization } = req.headers;
      const response = await this.service.getTransactions(authorization as string, req.query);
      return res.status(200).json({ data: response });
    } catch (error: any) {
      next(error);
    }
  }
}

export { TransactionController };
