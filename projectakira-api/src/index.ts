import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { schoolRouter } from './routers/schoolRouter';

dotenv.config();

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV;

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Route controllers
app.use('/schools', schoolRouter);

app.listen(PORT, async () => {
  if (NODE_ENV === 'development') {
    console.log(`Successfully listening on ${PORT}`);
  }
});
