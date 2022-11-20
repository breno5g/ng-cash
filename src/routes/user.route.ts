import { Router } from 'express';

import RouteFactorie from '../helpers/route.factorie';
import UserModel from '../models/User.model';
import { UserService } from '../services/User.service';
import { UserController } from '../controllers/User.controller';
import bodyValidator from '../middlewares/validateBody.middleware';
import { userBodySchema } from '../schemas/user';
import tokenValidator from '../middlewares/tokenValidator.middleware';
import { PrismaClient } from '@prisma/client';

const route = Router();
const controller = new RouteFactorie(UserModel, UserService, UserController, new PrismaClient()).Controller;

route.post('/',
  (req, res, next) => bodyValidator(userBodySchema, req, res, next),
  (req, res, next) => controller.login(req, res, next)
);

route.post('/create',
  (req, res, next) => bodyValidator(userBodySchema, req, res, next),
  (req, res, next) => controller.create(req, res, next)
);

route.get('/balance',
  (req, res, next) => tokenValidator(req, res, next),
  (req, res, next) => controller.getBalance(req, res, next)
);

export default route;
