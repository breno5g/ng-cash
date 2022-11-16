import { PrismaClient } from '@prisma/client';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import { UserController } from './controllers/User.controller';
import ErrorHandler from './middlewares/errorHandler.middleware';
import UserModel from './models/User.model';
import { UserService } from './services/User.service';

const app = express();
app.use(express.json());

app.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const response = await new UserController(new UserService(new UserModel(new PrismaClient()))).create(req, res, next);
  return res.status(200).json(response);
});

app.use(ErrorHandler);

app.listen(process.env.PORT, () => {
  console.log('server is on');
});
