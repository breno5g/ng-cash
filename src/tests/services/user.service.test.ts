import { PrismaClient } from '@prisma/client';
import { describe, it, expect, beforeEach, vitest, afterAll } from 'vitest';
import { UserAlreadyExistsError } from '../../errors';
import UserModel from '../../models/User.model';

describe('User service', () => {
  describe('Create user', () => {
    describe('Success case', () => {
      beforeEach(() => {
        vitest.spyOn(UserModel.prototype, 'create').mockImplementation(async () => 'User created successfuly');
        vitest.clearAllMocks();
      });

      it('should be possible create user', async () => {
        const model = new UserModel(new PrismaClient());
        const res = await model.create({ username: 'teste', password: '@Teste01' });
        expect(res).toBe('User created successfuly');
      });
    });

    describe('Fail case', () => {
      beforeEach(() => {
        vitest.spyOn(UserModel.prototype, 'create').mockImplementation(() => {
          throw new UserAlreadyExistsError();
        });
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should be possible create user', async () => {
        try {
          const model = new UserModel(new PrismaClient());
          await model.create({ username: 'teste', password: '@Teste01' });
        } catch (error: any) {
          expect(error.message).toBe('User already exists');
          expect(error.status).toBe(409);
        }
      });
    });
  });
});
