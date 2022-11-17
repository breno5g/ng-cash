import { PrismaClient } from '@prisma/client';
import { describe, it, expect, beforeEach, vitest, afterAll } from 'vitest';
import { UserAlreadyExistsError } from '../../errors';
import UserModel from '../../models/User.model';

import { IUser, IUserLogin } from '../../interfaces/IUser';
import { UserService } from '../../services/User.service';

import { userMock } from "../mocks/user"

describe('User service', () => {
  describe('Create user', () => {
    describe('Success case', () => {
      beforeEach(() => {
        vitest.spyOn(UserModel.prototype, 'create').mockImplementation(async () => 'User created successfuly');
        vitest.spyOn(UserModel.prototype, 'findOneByUsername').mockImplementation(async () => null)
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should be possible create user', async () => {
        const service = new UserService(new UserModel(new PrismaClient()));
        const res = await service.create({ username: 'teste', password: '@Teste01' });
        expect(res).toBe('User created successfuly');
      });
    });

    describe('Fail case', () => {
      beforeEach(() => {
        vitest.spyOn(UserModel.prototype, 'findOneByUsername').mockImplementation(async () => ({
          ...userMock
        } as unknown as IUser));
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should be throw error when user already exists', async () => {
        try {
          const service = new UserService(new UserModel(new PrismaClient()));
          await service.create({ username: 'teste', password: '@Teste01' });
        } catch (error: any) {
          expect(error.message).toBe('User already exists');
          expect(error.status).toBe(409);
        }
      });
    });
  });
});
