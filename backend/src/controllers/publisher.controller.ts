import { Response, Request } from 'express';
import { Publisher } from '../models/publisher.model';

import {
  getPublishers,
  getPublisherById,
  createPublisher,
  updatePublisher,
  deletePublisher,
} from '../service/publisher.service';
import { serverError } from '../utils/response';

export async function getPublishersController(
  req: Request,
  res: Response
) {
  try {
    const result = await getPublishers();

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
      'An error occurred while getting all publishers: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}

export async function getPublisherByIdController(
  req: Request,
  res: Response
) {
  const id = Number(req.params.id);

  // ? : check if id is not a number
  if (isNaN(id)) {
    return res.status(400).send({
      status: 400,
      message: 'Invalid ID',
    });
  }

  try {
    const result = await getPublisherById(id);

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
      'An error occurred while getting a publisher by id: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}

export async function createPublisherController(
  req: Request,
  res: Response
) {
  const bodyRequest: Publisher = req.body;

  // ? : check if name is empty
  if (!bodyRequest.name) {
    return res.status(400).send({
      status: 400,
      message: 'Name are required',
    });
  }

  try {
    const result = await createPublisher(bodyRequest);

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
      'An error occurred while creating a publisher: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}

export async function updatePublisherController(
  req: Request,
  res: Response
) {
  const id = Number(req.params.id);

  // ? : check if id is not a number
  if (isNaN(id)) {
    return res.status(400).send({
      status: 400,
      message: 'Invalid ID',
    });
  }

  const bodyRequest: Publisher = req.body;

  // ? : check if name is empty
  if (!bodyRequest.name) {
    return res.status(400).send({
      status: 400,
      message: 'Name are required',
    });
  }

  try {
    const result = await updatePublisher(id, bodyRequest);

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
      'An error occurred while updating a publisher: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}

export async function deletePublisherController(
  req: Request,
  res: Response
) {
  const id = Number(req.params.id);

  // ? : check if id is not a number
  if (isNaN(id)) {
    return res.status(400).send({
      status: 400,
      message: 'Invalid ID',
    });
  }

  try {
    const result = await deletePublisher(id);

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
      'An error occurred while deleting a publisher: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}
