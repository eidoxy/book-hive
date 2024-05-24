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
    const borrowings = await getBorrowings();

    if (borrowings) {
      return res.status(borrowings.status).send(borrowings);
    }
  } catch (error) {
    console.error(
      'An error occurred while fetching borrowings: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}

export async function getBorrowingByIdController(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);
    const borrowing = await getBorrowingById(id);

    if (borrowing) {
      return res.status(borrowing.status).send(borrowing);
    }
  } catch (error) {
    console.error(
      'An error occurred while fetching a borrowing: ',
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
    const borrowings = await getBorrowingsLate();

    if (borrowings) {
      return res.status(borrowings.status).send(borrowings);
    }
  } catch (error) {
    console.error(
      'An error occurred while fetching late borrowings: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}

export async function createBorrowingController(
  req: Request,
  res: Response
) {
  try {
    const bodyRequest: Borrowing = req.body;
    const borrowing = await createBorrowing(bodyRequest);

    if (borrowing) {
      return res.status(borrowing.status).send(borrowing);
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
  try {
    const id = Number(req.params.id);
    const bodyRequest: Borrowing = req.body;
    const borrowing = await updateBorrowing(id, bodyRequest);

    if (borrowing) {
      return res.status(borrowing.status).send(borrowing);
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
  try {
    const id = Number(req.params.id);
    const borrowing = await deleteBorrowing(id);

    if (borrowing) {
      return res.status(borrowing.status).send(borrowing);
    }
  } catch (error) {
    console.error(
      'An error occurred while deleting a borrowing: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}
