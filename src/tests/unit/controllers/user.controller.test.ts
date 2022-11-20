import { describe, it, expect, beforeEach, vitest, afterAll } from 'vitest';

import {mockError,mockNext,mockRequest,mockResponse} from "../mocks/express"

import {UserService} from "../../../services/User.service"
import {UserController} from "../../../controllers/User.controller"
import UserModel from '../../../models/User.model';
import { UserAlreadyExistsError, UsernameOrPasswordNotFoundError } from '../../../errors';

describe('User controller', () => {
  describe('Create', () => {
    describe('Success case', () => {
      let req = mockRequest();
      let res = mockResponse();
      let next = mockNext();
      beforeEach(() => {
        req.body = {
          username: "breno5g",
          password: "@Teste01"
        }
        vitest.spyOn(UserService.prototype, 'create').mockImplementation(async () => "User created successfuly");
      });
  
      afterAll(() => {
        vitest.clearAllMocks()
      });
  
      it('User created successfully', async () => {
        const controller = new UserController(new UserService({} as UserModel))
        await controller.create(req, res, next);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
          message: "User created successfuly"
        });
        
      });
    });

    describe('Fail case', () => {
      let req = mockRequest();
      let res = mockResponse();
      let next = mockNext();
      beforeEach(() => {
        req.body = {
          username: "breno5g",
          password: "@Teste01"
        }
        vitest.spyOn(UserService.prototype, 'create').mockImplementation(async () => {
          throw new UserAlreadyExistsError()
        });
      });
  
      afterAll(() => {
        vitest.clearAllMocks()
      });
  
      it('User already exists', async () => {
          const controller = new UserController(new UserService({} as any))
          await controller.create(req, res, next);
          
          expect(next).toHaveBeenCalledWith({
            message: "User already exists",
            status: 409
          })
      });
    });
  });

  describe('Login', () => {
    describe('Success case', () => {
      let req = mockRequest();
      let res = mockResponse();
      let next = mockNext();
      const returnMock = {
        data: { username: "breno5g", account: { balance: 100 } },
        token: "Fake token"
      }
      beforeEach(() => {
        req.body = {
          username: "breno5g",
          password: "@Teste01"
        }
        vitest.spyOn(UserService.prototype, 'login').mockImplementation(async () => returnMock);
      });
  
      afterAll(() => {
        vitest.clearAllMocks()
      });
  
      it('User created successfully', async () => {
        const controller = new UserController(new UserService({} as UserModel))
        await controller.login(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(returnMock);
        
      });
    });

    describe('Fail case', () => {
      let req = mockRequest();
      let res = mockResponse();
      let next = mockNext();
      beforeEach(() => {
        req.body = {
          username: "breno5g",
          password: "@Teste01"
        }
        vitest.spyOn(UserService.prototype, 'login').mockImplementation(async () => {
          throw new UsernameOrPasswordNotFoundError()
        });
      });
  
      afterAll(() => {
        vitest.clearAllMocks()
      });
  
      it('Username or password not found', async () => {
          const controller = new UserController(new UserService({} as any))
          await controller.login(req, res, next);
          
          expect(next).toHaveBeenCalledWith({
            message: "Username or Password not found",
            status: 400
          })
      });
    });
  });
});