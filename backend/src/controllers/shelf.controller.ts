import { Response, Request } from 'express';
import { Shelf } from '../models/shelf.mode';

import {
  getShelves,
  getShelfById,
  createShelf,
  updateShelf,
  deleteShelf,
} from '../service/shelf.service';
import { serverError } from '../utils/response';

export async function getShelvesController(
  req: Request,
  res: Response
) {
  try {
    const result = await getShelves();

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
      'An error occurred while getting all shelves: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}

export async function getShelfByIdController(
  req: Request,
  res: Response
) {
  const id = Number(req.params.id);

  // ? : check if id is not a number
  if (isNaN(id)) {
    return res.status(400).send({
      status: 400,
      message: 'Invalid shelf ID',
    });
  }

  try {
    const result = await getShelfById(id);

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
      'An error occurred while getting a shelf by id: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}

export async function createShelfController(
  req: Request,
  res: Response
) {
  const bodyRequest: Shelf = req.body;

  // ? : check if name and description is empty
  if (!bodyRequest.name || !bodyRequest.description) {
    return res.status(400).send({
      status: 400,
      message: 'Name and description are required',
    });
  }

  try {
    const result = await createShelf(bodyRequest);

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
      'An error occurred while creating a shelf: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}

export async function updateShelfController(
  req: Request,
  res: Response
) {
  const id = Number(req.params.id);

  // ? : check if id is not a number
  if (isNaN(id)) {
    return res.status(400).send({
      status: 400,
      message: 'Invalid shelf ID',
    });
  }

  const bodyRequest: Shelf = req.body;

  // ? : check if name and description is empty
  if (!bodyRequest.name || !bodyRequest.description) {
    return res.status(400).send({
      status: 400,
      message: 'Name and description are required',
    });
  }

  try {
    const result = await updateShelf(id, bodyRequest);

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
      'An error occurred while updating a shelf: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}

export async function deleteShelfController(
  req: Request,
  res: Response
) {
  const id = Number(req.params.id);

  // ? : check if id is not a number
  if (isNaN(id)) {
    return res.status(400).send({
      status: 400,
      message: 'Invalid shelf ID',
    });
  }

  try {
    const result = await deleteShelf(id);

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
      'An error occurred while deleting a shelf: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}
