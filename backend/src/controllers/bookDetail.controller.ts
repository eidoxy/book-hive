import { Request, Response } from 'express';
import { BookDetail } from '../models/bookDetail.model';

import {
  getBookDetails,
  getBookDetailById,
  createBookDetail,
  updateBookDetail,
  deleteBookDetail,
} from '../service/bookDetail.service';
import { response } from '../utils/response';

export async function getBookDetailsController(
  req: Request,
  res: Response
) {
  try {
    const bookDetails = await getBookDetails();

    if (bookDetails) {
      return res.status(bookDetails.status).send(bookDetails);
    }
  } catch (error) {
    console.error(
      'An error occurred while fetching book details: ',
      error
    );
    return res.status(500).send(response);
  }
}

export async function getBookDetailByIdController(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);
    const bookDetail = await getBookDetailById(id);

    if (bookDetail) {
      return res.status(bookDetail.status).send(bookDetail);
    }
  } catch (error) {
    console.error(
      'An error occurred while fetching a book detail: ',
      error
    );
    return res.status(500).send(response);
  }
}

export async function createBookDetailController(
  req: Request,
  res: Response
) {
  try {
    const bodyRequest: BookDetail = req.body;
    const bookDetail = await createBookDetail(bodyRequest);

    if (bookDetail) {
      return res.status(bookDetail.status).send(bookDetail);
    }
  } catch (error) {
    console.error(
      'An error occurred while creating a book detail: ',
      error
    );
    return res.status(500).send(response);
  }
}

export async function updateBookDetailController(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);
    const bodyRequest: BookDetail = req.body;
    const bookDetail = await updateBookDetail(id, bodyRequest);

    if (bookDetail) {
      return res.status(bookDetail.status).send(bookDetail);
    }
  } catch (error) {
    console.error(
      'An error occurred while updating a book detail: ',
      error
    );
    return res.status(500).send(response);
  }
}

export async function deleteBookDetailController(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);
    const bookDetail = await deleteBookDetail(id);

    if (bookDetail) {
      return res.status(bookDetail.status).send(bookDetail);
    }
  } catch (error) {
    console.error(
      'An error occurred while deleting a book detail: ',
      error
    );
    return res.status(500).send(response);
  }
}
