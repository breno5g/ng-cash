import { User } from '@prisma/client';
import { describe, it, expect, beforeEach, vitest, afterAll } from 'vitest';
import { ITransaction } from '../../../interfaces/ITransaction';
import { TransactionModel } from '../../../models/transaction.model';

import { prismaMock } from '../mocks/prisma.mock';
import { cashInTransactionsMock, cashOutTransactionsMock, transactionsMock } from '../mocks/transactions.mock';
import { userMock } from '../mocks/user';

describe('Transaction model', () => {
  describe('Create', () => {
    describe('Success case', () => {
      beforeEach(() => {
        prismaMock.user.findUniqueOrThrow
          .mockResolvedValueOnce(userMock[0] as User)
          .mockResolvedValueOnce({...userMock[0], id: 2} as User)
        prismaMock.transaction.create.mockResolvedValue({} as any)
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should be possible create user', async () => {
        const model = new TransactionModel(prismaMock);
        const res = await model.create({accountToDebit: "teste",transactionValue:100,userAccountId: 1 });
        expect(res).toBe('Transaction created with success');
      });
    });

    describe('Fail case', () => {
      describe('When user self transfer by username', () => {
        beforeEach(() => {
          prismaMock.user.findUniqueOrThrow
            .mockResolvedValueOnce(userMock[0] as User)
            .mockResolvedValueOnce(userMock[0] as User)
          prismaMock.transaction.create.mockResolvedValue({} as any)
        });
  
        afterAll(() => {
          vitest.clearAllMocks();
        });
  
        it('should be possible create user', async () => {
          try {
            const model = new TransactionModel(prismaMock);
            await model.create({accountToDebit: "teste", transactionValue:100, userAccountId: 1 });
          } catch (error: any) {
            expect(error.message).toBe("Unauthorized");
            expect(error.status).toBe(401);
          }
        });
      });

      describe('When user self transfer by username', () => {
        beforeEach(() => {
          prismaMock.user.findUniqueOrThrow
            .mockResolvedValueOnce(userMock[0] as User)
            .mockResolvedValueOnce({...userMock[0], id: 2} as User)
          prismaMock.transaction.create.mockResolvedValue({} as any)
        });
  
        afterAll(() => {
          vitest.clearAllMocks();
        });
  
        it('should be possible create user', async () => {
          try {
            const model = new TransactionModel(prismaMock);
            await model.create({accountToDebit: "teste", transactionValue:200, userAccountId: 1 });
          } catch (error: any) {
            expect(error.message).toBe("Insufficient balance")
            expect(error.status).toBe(406)
          }
        });
      });
    });
  });

  describe('Get transactions', () => {
    describe('Success case', () => {
      beforeEach(() => {
        prismaMock.transaction.findMany.mockResolvedValue(transactionsMock as any)
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should be possible create user', async () => {
        const model = new TransactionModel(prismaMock);
        const res = await model.getTransactions(1, {});
        expect(res).toStrictEqual(transactionsMock);
      });
    });

    describe('Success case when pass date', () => {
      beforeEach(() => {
        prismaMock.transaction.findMany.mockResolvedValue([] as any)
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should be possible create user', async () => {
        const model = new TransactionModel(prismaMock);
        const res = await model.getTransactions(1, {date: "2075-12-23"});
        expect(res).toStrictEqual([]);
      });
    });

    describe('Success case when pass cash out', () => {
      beforeEach(() => {
        prismaMock.transaction.findMany.mockResolvedValue(cashOutTransactionsMock as any)
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should be possible create user', async () => {
        const model = new TransactionModel(prismaMock);
        const res = await model.getTransactions(1, {"cash-out": true});
        expect(res).toStrictEqual(cashOutTransactionsMock);
      });
    });

    describe('Success case when pass cash-in', () => {
      beforeEach(() => {
        prismaMock.transaction.findMany.mockResolvedValue(cashInTransactionsMock as any)
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should be possible create user', async () => {
        const model = new TransactionModel(prismaMock);
        const res = await model.getTransactions(1, {"cash-in": true});
        expect(res).toStrictEqual(cashInTransactionsMock);
      });
    });
  });
});
