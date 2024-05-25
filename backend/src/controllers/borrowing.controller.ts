import { Request, Response } from 'express';
import { Borrowing } from '../models/borrowing.model';

import {
  getBorrowings,
  getBorrowingById,
  getBorrowingsLate,
  createBorrowing,
  updateBorrowing,
  deleteBorrowing,
} from '../service/borrowing.service';
import { serverError } from '../utils/response';

export async function getBorrowingsController(
  req: Request,
  res: Response
) {
  try {
    const result = await getBorrowings();

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
      'An error occurred while getting all borrowings: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}

export async function getBorrowingByIdController(
  req: Request,
  res: Response
) {
  const id = Number(req.params.id);

  // ? : check if id is not a number
  if (isNaN(id)) {
    return res.status(400).send({
      status: 400,
      message: 'Invalid borrowing ID',
    });
  }

  try {
    const result = await getBorrowingById(id);

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
      'An error occurred while getting a borrowing by id: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}

export async function getBorrowingsLateController(
  req: Request,
  res: Response
) {
  try {
    const result = await getBorrowingsLate();

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
      'An error occurred while getting late borrowings: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}

export async function createBorrowingController(
  req: Request,
  res: Response
) {
  const bodyRequest: Borrowing = req.body;

  // ? : check if bodyRequest is not a Borrowing
  if (!bodyRequest) {
    return res.status(400).send({
      status: 400,
      message: 'Invalid request body',
    });
  }

  try {
    const result = await createBorrowing(bodyRequest);

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
      'An error occurred while creating a borrowing: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}

export async function updateBorrowingController(
  req: Request,
  res: Response
) {
  const id = Number(req.params.id);

  // ? : check if id is not a number
  if (isNaN(id)) {
    return res.status(400).send({
      status: 400,
      message: 'Invalid borrowing ID',
    });
  }

  const bodyRequest: Borrowing = req.body;

  // ? : check if bodyRequest is not a Borrowing
  if (!bodyRequest) {
    return res.status(400).send({
      status: 400,
      message: 'Invalid request body',
    });
  }

  try {
    const result = await updateBorrowing(id, bodyRequest);

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
      'An error occurred while updating a borrowing: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}

export async function deleteBorrowingController(
  req: Request,
  res: Response
) {
  const id = Number(req.params.id);

  // ? : check if id is not a number
  if (isNaN(id)) {
    return res.status(400).send({
      status: 400,
      message: 'Invalid borrowing ID',
    });
  }

  try {
    const result = await deleteBorrowing(id);

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
      'An error occurred while deleting a borrowing: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}
