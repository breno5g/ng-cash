import { NextFunction, Request, Response } from 'express';
import ITransactionService from '../interfaces/ITransactionService';

class TransactionController {
  private readonly service: ITransactionService;
  constructor (service: ITransactionService) {
    this.service = service;
  }

  public async create (req: Request, res: Response, next: NextFunction): Promise<any | null> {
    try {
      const { accountToDebit, transactionValue, token } = req.body;
      const response = await this.service.create(accountToDebit, transactionValue, token);
      return res.status(201).json({ message: response });
    } catch (error: any) {
      next(error);
    }
  }
}

export { TransactionController };
