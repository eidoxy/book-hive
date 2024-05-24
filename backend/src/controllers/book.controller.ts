import { Response, Request } from 'express';
import { Book } from '../models/book.model';

import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from '../service/book.service';
import { serverError } from '../utils/response';

export async function getBooksController(
  req: Request,
  res: Response
) {
  try {
    const books = await getBooks();

    if (books) {
      return res.status(books.status).send(books);
    }
  } catch (error) {
    console.error('An error occurred while fetching books: ', error);
    return res.status(serverError.status).send(serverError);
  }
}

export async function getBookByIdController(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);
    const book = await getBookById(id);

    if (book) {
      return res.status(book.status).send(book);
    }
  } catch (error) {
    console.error('An error occurred while fetching a book: ', error);
    return res.status(serverError.status).send(serverError);
  }
}

export async function createBookController(
  req: Request,
  res: Response
) {
  try {
    const bodyRequest: Book = req.body;
    const book = await createBook(bodyRequest);

    if (book) {
      return res.status(book.status).send(book);
    }
  } catch (error) {
    console.error('An error occurred while creating a book: ', error);
    return res.status(serverError.status).send(serverError);
  }
}

export async function updateBookController(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);
    const bodyRequest: Book = req.body;
    const book = await updateBook(id, bodyRequest);

    if (book) {
      return res.status(book.status).send(book);
    }
  } catch (error) {
    console.error('An error occurred while updating a book: ', error);
    return res.status(serverError.status).send(serverError);
  }
}

export async function deleteBookController(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);
    const book = await deleteBook(id);

    if (book) {
      return res.status(book.status).send(book);
    }
  } catch (error) {
    console.error('An error occurred while deleting a book: ', error);
    return res.status(serverError.status).send(serverError);
  }
}
