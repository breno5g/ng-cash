import { Router } from 'express';
import userRoute from './user.route';

const route = Router();

route.use('/user', userRoute);

export { route as routes };
