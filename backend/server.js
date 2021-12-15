import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import rootRouter from './routes/rootRouter.js';

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log('Connected to MongoDB Database.'))
  .catch(err => console.log(err));

app.use('/', rootRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}.`));
