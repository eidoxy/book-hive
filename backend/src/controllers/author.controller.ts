import { Response, Request } from 'express';
import { Author } from '../models/author.model';

import {
  getAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from '../service/author.service';
import { serverError } from '../utils/response';

export async function getAuthorsController(
  req: Request,
  res: Response
) {
  try {
    const result = await getAuthors();

    // ? : check if result doesn't have status or invalid status
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
    console.error(
      'An error occurred while getting all authors: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}

export async function getAuthorByIdController(
  req: Request,
  res: Response
) {
  const id = Number(req.params.id);

  // ? : check if id is not a number
  if (isNaN(id)) {
    return res.status(400).send({
      status: 400,
      message: 'Invalid author ID',
    });
  }

  try {
    const result = await getAuthorById(id);

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
      'An error occurred while getting author by id: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}

export async function createAuthorController(
  req: Request,
  res: Response
) {
  const bodyRequest: Author = req.body;

  // ? : check if name and description is empty
  if (!bodyRequest.name || !bodyRequest.description) {
    return res.status(400).send({
      status: 400,
      message: 'Name and description are required',
    });
  }

  try {
    const result = await createAuthor(bodyRequest);

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
      'An error occurred while creating an author: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}

export async function updateAuthorController(
  req: Request,
  res: Response
) {
  const id = Number(req.params.id);

  // ? : check if id is not a number
  if (isNaN(id)) {
    return res.status(400).send({
      status: 400,
      message: 'Invalid author ID',
    });
  }

  const bodyRequest: Author = req.body;

  // ? : check if name and description is empty
  if (!bodyRequest.name || !bodyRequest.description) {
    return res.status(400).send({
      status: 400,
      message: 'Name and description are required',
    });
  }

  try {
    const result = await updateAuthor(id, bodyRequest);

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
      'An error occurred while updating an author: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}

export async function deleteAuthorController(
  req: Request,
  res: Response
) {
  const id = Number(req.params.id);

  // ? : check if id is not a number
  if (isNaN(id)) {
    return res.status(400).send({
      status: 400,
      message: 'Invalid author ID',
    });
  }

  try {
    const result = await deleteAuthor(id);

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
      'An error occurred while deleting an author: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}
