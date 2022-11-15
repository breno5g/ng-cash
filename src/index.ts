import 'dotenv/config';
import express from 'express';

const app = express();

app.get('/', (_req, res) => {
  return res.status(200).json('ok');
});

app.listen(process.env.PORT, () => {
  console.log('O pai ta on');
});
