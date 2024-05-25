import { Request, Response } from 'express';
import { BookDetail } from '../models/bookDetail.model';

import {
  getBookDetails,
  getBookDetailById,
  createBookDetail,
  updateBookDetail,
  deleteBookDetail,
} from '../service/bookDetail.service';
import { serverError } from '../utils/response';

export async function getBookDetailsController(
  req: Request,
  res: Response
) {
  try {
    const result = await getBookDetails();

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
    console.error(
      'An error occurred while getting all books detail: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}

export async function getBookDetailByIdController(
  req: Request,
  res: Response
) {
  const id = Number(req.params.id);

  // ? : check if id is not a number
  if (isNaN(id)) {
    return res.status(400).send({
      status: 400,
      message: 'Invalid book detail ID',
    });
  }

  try {
    const result = await getBookDetailById(id);

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
      'An error occurred while getting a book detail by id: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}

export async function createBookDetailController(
  req: Request,
  res: Response
) {
  const bodyRequest: BookDetail = req.body;

  // ? : check if bodyRequest is not a BookDetail
  if (!bodyRequest) {
    return res.status(400).send({
      status: 400,
      message: 'Invalid request body',
    });
  }

  try {
    const result = await createBookDetail(bodyRequest);

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
      'An error occurred while creating a book detail: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}

export async function updateBookDetailController(
  req: Request,
  res: Response
) {
  const id = Number(req.params.id);

  // ? : check if id is not a number
  if (isNaN(id)) {
    return res.status(400).send({
      status: 400,
      message: 'Invalid book detail ID',
    });
  }

  const bodyRequest: BookDetail = req.body;

  // ? : check if bodyRequest is not a BookDetail
  if (!bodyRequest) {
    return res.status(400).send({
      status: 400,
      message: 'Invalid request body',
    });
  }

  try {
    const result = await updateBookDetail(id, bodyRequest);

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
      'An error occurred while updating a book detail: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}

export async function deleteBookDetailController(
  req: Request,
  res: Response
) {
  const id = Number(req.params.id);

  // ? : check if id is not a number
  if (isNaN(id)) {
    return res.status(400).send({
      status: 400,
      message: 'Invalid book detail ID',
    });
  }

  try {
    const result = await deleteBookDetail(id);

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
      'An error occurred while deleting a book detail: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}
