import 'dotenv/config';
import express from 'express';
import ErrorHandler from './middlewares/errorHandler.middleware';
import { routes } from './routes';

const app = express();
app.use(express.json());

app.use(routes);

app.use(ErrorHandler);

app.listen(process.env.PORT, () => {
  console.log('server is on');
});
