import { describe, it, expect, beforeEach, vitest, afterAll } from 'vitest';

import {mockNext,mockRequest,mockResponse} from "../mocks/express"

import { TransactionService } from '../../../services/Transaction.service';
import { TransactionController } from '../../../controllers/Transaction.controller';
import { InternalServerError, UnauthorizedError } from '../../../errors';
import { transactionsMock } from '../mocks/transactions.mock';

describe('Transaction controller', () => {
  describe('Create', () => {
    describe('Success case', () => {
      let req = mockRequest();
      let res = mockResponse();
      let next = mockNext();
      beforeEach(() => {
        vitest.spyOn(TransactionService.prototype, 'create').mockImplementation(async () => "Transaction created with success");
      });
  
      afterAll(() => {
        vitest.clearAllMocks()
      });
  
      it('Transaction created successfully', async () => {
        const controller = new TransactionController(new TransactionService({} as any))
        await controller.create(req, res, next);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
          message: "Transaction created with success"
        });
        
      });
    });

    describe('Fail case', () => {
      let req = mockRequest();
      let res = mockResponse();
      let next = mockNext();
      beforeEach(() => {
        vitest.spyOn(TransactionService.prototype, 'create').mockImplementation(async () => {
          throw new UnauthorizedError()
        });
      });
  
      afterAll(() => {
        vitest.clearAllMocks()
      });
  
      it('Unauthorized', async () => {
          const controller = new TransactionController(new TransactionService({} as any))
          await controller.create(req, res, next);
          
          expect(next).toHaveBeenCalledWith({
            message: "Unauthorized",
            status: 401
          })
      });
    });
  });

  describe('Get balance', () => {
    describe('Success case', () => {
      let req = mockRequest();
      let res = mockResponse();
      let next = mockNext();

      beforeEach(() => {
        vitest.spyOn(TransactionService.prototype, 'getTransactions').mockImplementation(async () => (transactionsMock as any));
      });
  
      afterAll(() => {
        vitest.clearAllMocks()
      });
  
      it('should be possible get all transactions', async () => {
        const controller = new TransactionController(new TransactionService({} as any))
        await controller.getTransactions(req, res, next);
        
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({data: transactionsMock});
        
      });
    });
    describe('Fail case', () => {
      let req = mockRequest();
      let res = mockResponse();
      let next = mockNext();

      beforeEach(() => {
        vitest.spyOn(TransactionService.prototype, 'getTransactions').mockImplementation(() => {
          throw new InternalServerError()
        });
      });
  
      afterAll(() => {
        vitest.clearAllMocks()
      });
  
      it('should be possible get all transactions', async () => {
        const controller = new TransactionController(new TransactionService({} as any))
        await controller.getTransactions(req, res, next);
        
        expect(next).toHaveBeenCalledWith({
          message: "Internal server error",
          status: 500
        });
        
      });
    });

  });
});