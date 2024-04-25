import express, { request, response } from "express";
import mongoose from 'mongoose';
import cors from 'cors';
import { PORT, mongoDbURL } from "./config.js";
import booksRoute from './routes/booksRoute.js';

const app = express();

app.use(express.json());

// Middleware for handling CORS POLICY
app.use(cors());
// app.use(cors({
//   origin: 'http://localhost:3000/',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type'],
// }));

app.get('/', (rerequestq, response) => {
  console.log(request);
  return response.send("<h1>Hello World!</h1>")
});

app.use('/', booksRoute);

mongoose
  .connect(mongoDbURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    })
  })
  .catch((error) => {
    console.log(error);
  })