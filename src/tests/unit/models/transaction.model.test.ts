import { User } from '@prisma/client';
import { describe, it, expect, beforeEach, vitest, afterAll } from 'vitest';
import { TransactionModel } from '../../../models/transaction.model';

import { prismaMock } from '../mocks/prisma.mock';
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
});
