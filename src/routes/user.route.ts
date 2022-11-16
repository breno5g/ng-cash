import { Router } from 'express';

import RouteFactorie from '../helpers/route.factorie';
import UserModel from '../models/User.model';
import { UserService } from '../services/User.service';
import { UserController } from '../controllers/User.controller';

const route = Router();
const controller = new RouteFactorie(UserModel, UserService, UserController).Controller;

route.post('/create', (req, res, next) => controller.create(req, res, next));

export default route;
