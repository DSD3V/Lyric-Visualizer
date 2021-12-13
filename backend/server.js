import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

import rootRouter from './routes/rootRouter.js';

const app = express();
app.use(express.json())

// TODO: add Mongo DB URI to .env file
const db = process.env.MONGO_URI;

//Connect to Mongo Database
mongoose
  .connect(db, {
    useNewUrlParser: true,
  })
  .then(() => console.log('Connected to MongoDB Database.'))
  .catch(err => console.log(err));

//Use Routes
app.use('/', rootRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}.`));
