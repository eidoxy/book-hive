import { Response, Request } from 'express';
import { Book } from '../models/book.model';

import {
  getBooks,
  getBookById,
  getBookList,
  getBookRecomendation,
  getBookByCategory,
  getBookPopular,
  createBook,
  updateBook,
  deleteBook,
} from '../service/book.service';
import { serverError } from '../utils/response';

export async function getBooksController(req: Request, res: Response) {
  try {
    const result = await getBooks();

    // ? : check if result is doesn't have status or invalid status
    if (
      result &&
      result.status >= 200 &&
      result.status < 300 &&
      typeof result.status == 'number'
    ) {
      return res.status(result.status).send(result);
    } else {
      throw new Error('Invalid status code');
    }
  } catch (error) {
    console.error('An error occurred while getting all books: ', error);
    return res.status(serverError.status).send(serverError);
  }
}

export async function getBookByIdController(req: Request, res: Response) {
  const id = Number(req.params.id);

  // ? : check if id is not a number
  if (isNaN(id)) {
    return res.status(400).send({
      status: 400,
      message: 'Invalid book ID',
    });
  }

  try {
    const result = await getBookById(id);

    // ? : check if result doesn't have status or invalid status
    if (
      result.status &&
      result.status >= 200 &&
      result.status < 300 &&
      typeof result.status == 'number'
    ) {
      return res.status(result.status).send(result);
    } else {
      throw new Error('Invalid status code');
    }
  } catch (error) {
    console.error('An error occurred while getting a book by id: ', error);
    return res.status(serverError.status).send(serverError);
  }
}

export async function getBookListController(req: Request, res: Response) {
  try {
    const result = await getBookList();

    // ? : check if result doesn't have status or invalid status
    if (
      result.status &&
      result.status >= 200 &&
      result.status < 300 &&
      typeof result.status == 'number'
    ) {
      return res.status(result.status).send(result);
    } else {
      throw new Error('Invalid status code');
    }
  } catch (error) {
    console.error('An error occurred while getting a book list: ', error);
    return res.status(serverError.status).send(serverError);
  }
}

export async function getBookRecomendationController(
  req: Request,
  res: Response
) {
  try {
    const result = await getBookRecomendation();

    // ? : check if result doesn't have status or invalid status
    if (
      result.status &&
      result.status >= 200 &&
      result.status < 300 &&
      typeof result.status == 'number'
    ) {
      return res.status(result.status).send(result);
    } else {
      throw new Error('Invalid status code');
    }
  } catch (error) {
    console.error(
      'An error occurred while getting a book with stock: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}

export async function getBookPopularController(
  req: Request,
  res: Response
) {
  try {
    const result = await getBookPopular();

    // ? : check if result doesn't have status or invalid status
    if (
      result.status &&
      result.status >= 200 &&
      result.status < 300 &&
      typeof result.status == 'number'
    ) {
      return res.status(result.status).send(result);
    } else {
      throw new Error('Invalid status code');
    }
  } catch (error) {
    console.error(
      'An error occurred while getting a popular book: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}

export async function getBookByCategoryController(
  req: Request,
  res: Response
) {
  const categoryId = Number(req.params.id);

  // ? : check if categoryId is not a number
  if (isNaN(categoryId)) {
    return res.status(400).send({
      status: 400,
      message: 'Invalid category ID',
    });
  }

  try {
    const result = await getBookByCategory(categoryId);

    // ? : check if result doesn't have status or invalid status
    if (
      result.status &&
      result.status >= 200 &&
      result.status < 300 &&
      typeof result.status == 'number'
    ) {
      return res.status(result.status).send(result);
    } else {
      throw new Error('Invalid status code');
    }
  } catch (error) {
    console.error(
      'An error occurred while getting a book by category: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}

export async function createBookController(req: Request, res: Response) {
  const bodyRequest: Book = req.body;
  const file = req.file as Express.Multer.File;

  // ? : check if title and description is empty
  if (!bodyRequest.title || !bodyRequest.description) {
    return res.status(400).send({
      status: 400,
      message: 'Title and description are required',
    });
  }

  try {
    const result = await createBook(bodyRequest, file);

    // ? : check if result doesn't have status or invalid status
    if (
      result.status &&
      result.status >= 200 &&
      result.status < 300 &&
      typeof result.status == 'number'
    ) {
      return res.status(result.status).send(result);
    } else {
      throw new Error('Invalid status code');
    }
  } catch (error) {
    console.error('An error occurred while creating a book: ', error);
    return res.status(serverError.status).send(serverError);
  }
}

export async function updateBookController(req: Request, res: Response) {
  const id = Number(req.params.id);

  // ? : check if id is not a number
  if (isNaN(id)) {
    return res.status(400).send({
      status: 400,
      message: 'Invalid book ID',
    });
  }

  const bodyRequest: Book = req.body;

  // ? : check if title and description is empty
  if (!bodyRequest.title || !bodyRequest.description) {
    return res.status(400).send({
      status: 400,
      message: 'Title and description are required',
    });
  }

  try {
    const result = await updateBook(id, bodyRequest);

    // ? : check if result doesn't have status or invalid status
    if (
      result.status &&
      result.status >= 200 &&
      result.status < 300 &&
      typeof result.status == 'number'
    ) {
      return res.status(result.status).send(result);
    } else {
      throw new Error('Invalid status code');
    }
  } catch (error) {
    console.error('An error occurred while updating a book: ', error);
    return res.status(serverError.status).send(serverError);
  }
}

export async function deleteBookController(req: Request, res: Response) {
  const id = Number(req.params.id);

  // ? : check if id is not a number
  if (isNaN(id)) {
    return res.status(400).send({
      status: 400,
      message: 'Invalid book ID',
    });
  }

  try {
    const result = await deleteBook(id);

    // ? : check if result doesn't have status or invalid status
    if (
      result.status &&
      result.status >= 200 &&
      result.status < 300 &&
      typeof result.status == 'number'
    ) {
      return res.status(result.status).send(result);
    } else {
      throw new Error('Invalid status code');
    }
  } catch (error) {
    console.error('An error occurred while deleting a book: ', error);
    return res.status(serverError.status).send(serverError);
  }
}
