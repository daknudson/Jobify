import express from "express";
import notFound from "./middleware/not-found.js";
import errorHandler from "./middleware/error-handler.js";
import connectDB from "./db/connect.js";
import 'express-async-errors'
import morgan from 'morgan'

import {dirname} from 'path'
import { fileURLToPath } from "url";
import path from 'path'

import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

import authenticateUser from "./middleware/auth.js";
const app = express();
import dotenv from "dotenv";



dotenv.config();


import authRouter from './routes/authRouter.js'
import jobsRouter from './routes/jobsRouter.js'

if(process.env.NODE_ENV !== "production") {
  app.use(morgan('dev'))
}

const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(express.static(path.resolve(__dirname, './client/build')))
app.use(express.json())

app.use(helment())
app.use(mongoSanitize())
app.use(xss())

app.get('/', (req, res) => {
  res.json({msg: 'welcome'})
})

app.get("/api/v1", (req, res) => {
  res.json({msg: 'API'});
});

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobsRouter)


app.use(notFound);
app.use(errorHandler);
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
