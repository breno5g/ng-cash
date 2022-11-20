import { PrismaClient } from '@prisma/client';
import { Router } from 'express';
import { TransactionController } from '../controllers/Transaction.controller';

import RouteFactorie from '../helpers/route.factorie';
import tokenValidator from '../middlewares/tokenValidator.middleware';
import { TransactionModel } from '../models/transaction.model';
import { TransactionService } from '../services/Transaction.service';

const route = Router();
const controller = new RouteFactorie(TransactionModel, TransactionService, TransactionController, new PrismaClient()).Controller;

route.post('/',
  (req, res, next) => tokenValidator(req, res, next),
  (req, res, next) => controller.create(req, res, next)
);

route.get('/',
  (req, res, next) => tokenValidator(req, res, next),
  (req, res, next) => controller.getTransactions(req, res, next)
);

export default route;
