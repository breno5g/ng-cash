import { Router } from 'express';
import { docs } from './docs.route';
import userRoute from './user.route';

const route = Router();

route.use('/user', userRoute);
route.use('/docs', docs);

export { route as routes };
