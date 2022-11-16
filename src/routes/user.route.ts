import { Router } from 'express';

import RouteFactorie from '../helpers/route.factorie';
import UserModel from '../models/User.model';
import { UserService } from '../services/User.service';
import { UserController } from '../controllers/User.controller';
import bodyValidator from '../middlewares/validateBody.middleware';
import { userBodySchema } from '../schemas/user';

const route = Router();
const controller = new RouteFactorie(UserModel, UserService, UserController).Controller;

route.post('/create',
  (req, res, next) => bodyValidator(userBodySchema, req, res, next),
  (req, res, next) => controller.create(req, res, next)
);

export default route;
