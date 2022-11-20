import { PrismaClient } from '@prisma/client';
import { describe, it, expect, beforeEach, vitest, afterAll } from 'vitest';


import { tokenMock } from "../mocks/user"
import { TransactionModel } from '../../../models/transaction.model';
import { TransactionService } from '../../../services/Transaction.service';
import { transactionsMock } from '../mocks/transactions.mock';

describe('Transaction service', () => {
  describe('Create transaction', () => {
    describe('Success case', () => {
      beforeEach(() => {
        vitest.spyOn(TransactionModel.prototype, 'create').mockImplementation(async () => 'Transaction created with success');
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should be possible create user', async () => {
        const service = new TransactionService(new TransactionModel(new PrismaClient()));
        const res = await service.create("teste", 200, tokenMock);
        expect(res).toBe('Transaction created with success');
      });
    });

    describe('Fail case', () => {
      beforeEach(() => {
        vitest.spyOn(TransactionModel.prototype, 'create').mockImplementation(async () => 'Transaction created with success');
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should be throw error when user already exists', async () => {
        try {
          const service = new TransactionService({} as any);
          await service.create("teste", 200, "fake token");
        } catch (error: any) {
          expect(error.message).toBe('Unauthorized');
          expect(error.status).toBe(401);
        }
      });
    });
  });

  describe('Get transactions', () => {
    describe('Success case', () => {
      beforeEach(() => {
        vitest.spyOn(TransactionModel.prototype, 'getTransactions').mockImplementation(async () => transactionsMock as any);
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should be possible create user', async () => {
        const service = new TransactionService(new TransactionModel(new PrismaClient()));
        const res = await service.getTransactions(tokenMock, {});
        expect(res).toBe(transactionsMock);
      });
    });

  });
});
