import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import * as path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import rootRouter from './routes/rootRouter.js';

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log('Connected to MongoDB Database.'))
  .catch(error => console.log(error));

app.use('/', rootRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../frontend/build'));

  const __dirname = dirname(fileURLToPath(import.meta.url));

  app.get('*', (_, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}.`));
