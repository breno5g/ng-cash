import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { describe, it, expect, beforeEach, vitest, afterAll } from 'vitest';
import UserModel from '../../models/User.model';

import { prismaMock } from '../mocks/prisma.mock';
import { userMock } from '../mocks/user';

describe('User model', () => {
  describe('Create user', () => {
    describe('Success case', () => {
      beforeEach(() => {
        prismaMock.user.create.mockResolvedValue({} as any)
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should be possible create user', async () => {
        const model = new UserModel(prismaMock);
        const res = await model.create({ username: 'teste', password: 'SenhaHasheada' });
        expect(res).toBe('User created successfuly');
      });
    });

    describe('Fail case', () => {
      describe('Username already exists', () => {
        beforeEach(() => {
          prismaMock.user.create.mockImplementation( () => {
            throw new PrismaClientKnownRequestError("", "P2002", "")
          })
        });
  
        afterAll(() => {
          vitest.clearAllMocks();
        });
  
        it('should be throw error when user already exists', async () => {
          try {
            const model = new UserModel(prismaMock);
            await model.create({ username: 'teste', password: '@Teste01' });
          } catch (error: any) {
            expect(error.message).toBe('User already exists');
            expect(error.status).toBe(409);
          }
        });
      });

      describe('Internal server error', () => {
        beforeEach(() => {
          prismaMock.user.create.mockImplementation( () => {
            throw new Error()
          })
        });
  
        afterAll(() => {
          vitest.clearAllMocks();
        });
  
        it('should be throw error when user already exists', async () => {
          try {
            const model = new UserModel(prismaMock);
            await model.create({ username: 'teste', password: '@Teste01' });
          } catch (error: any) {
            expect(error.message).toBe('Internal server error');
            expect(error.status).toBe(500);
          }
        });
      });
    });
  });
  describe('Find one by username', () => {
    describe('Success case', () => {
      beforeEach(() => {
        prismaMock.user.findUnique.mockResolvedValue(userMock[0] as User)
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should be possible find user', async () => {
        const model = new UserModel(prismaMock);
        const res = await model.findOneByUsername('teste');
        expect(res?.username).toBe(userMock[0].username);
      });
    });

    describe('Fail case', () => {
      beforeEach(() => {
        prismaMock.user.findUnique.mockResolvedValue(null)
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should be possible find user', async () => {
        const model = new UserModel(prismaMock);
        const res = await model.findOneByUsername('teste');
        expect(res).toBeNull();
      });
    });
  });
});
