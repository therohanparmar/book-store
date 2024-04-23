import express, { request, response } from "express";
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js'
import { PORT, mongoDbURL } from "./config.js";

const app = express();

app.use(express.json());

app.get('/', (rerequestq, response) => {
  console.log(request);
  return response.send("<h1>Hello World!</h1>")
});

app.post('/book', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, author, publishYear'
      })
    }

    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear
    }

    const book = await Book.create(newBook);

    return response.status(201).send(book);

  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
});

app.get('/books', async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json(books);
  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
})

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