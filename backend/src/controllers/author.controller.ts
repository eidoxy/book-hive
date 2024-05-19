import { Response, Request } from 'express';
import { Author } from '../models/author.model';

import {
  getAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from '../service/author.service';
import { response } from '../utils/response';

export async function getAuthorsController(
  req: Request,
  res: Response
) {
  try {
    const authors = await getAuthors();

    if (authors) {
      return res.status(authors.statusCode).send(authors);
    }
  } catch (error) {
    console.error(
      'An error occurred while fetching authors: ',
      error
    );
    return res.status(500).send(response);
  }
}

export async function getAuthorByIdController(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);
    const author = await getAuthorById(id);

    if (author) {
      return res.status(author.statusCode).send(author);
    }
  } catch (error) {
    console.error(
      'An error occurred while fetching an author: ',
      error
    );
    return res.status(500).send(response);
  }
}

export async function createAuthorController(
  req: Request,
  res: Response
) {
  try {
    const bodyRequest: Author = req.body;
    const author = await createAuthor(bodyRequest);

    if (author) {
      return res.status(author.statusCode).send(author);
    }
  } catch (error) {
    console.error(
      'An error occurred while creating an author: ',
      error
    );
    return res.status(500).send(response);
  }
}

export async function updateAuthorController(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);
    const bodyRequest: Author = req.body;
    const author = await updateAuthor(id, bodyRequest);

    if (author) {
      return res.status(author.statusCode).send(author);
    }
  } catch (error) {
    console.error(
      'An error occurred while updating an author: ',
      error
    );
    return res.status(500).send(response);
  }
}

export async function deleteAuthorController(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);
    const author = await deleteAuthor(id);

    if (author) {
      return res.status(author.statusCode).send(author);
    }
  } catch (error) {
    console.error(
      'An error occurred while deleting an author: ',
      error
    );
    return res.status(500).send(response);
  }
}
