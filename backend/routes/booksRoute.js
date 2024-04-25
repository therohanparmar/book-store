import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

// Insert New Book Record
router.post('/book', async (request, response) => {
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

// Get All Book Records
router.get('/books', async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      data: books
    });
  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
});

// Get Book Record By Id
router.get('/book/:id', async (request, response) => {
  try {

    const { id } = request.params;
    const book = await Book.findById(id);
    return response.status(200).json(book);
  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
});

// Update Book Record
router.put('/book/:id', async (request, response) => {
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

    const { id } = request.params;
    const result = await Book.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).send({ message: 'Book not found.' });
    }

    return response.status(200).send({ message: 'Book updated successfully.' });

  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
});

// Delete Book Record
router.delete('/book/:id', async (request, response) => {
  try {

    const { id } = request.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).send({ message: 'Book not found.' });
    }

    return response.status(200).send({ message: 'Book deleted successfully.' });

  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
});

export default router;