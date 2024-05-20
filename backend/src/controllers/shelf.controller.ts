import { Response, Request } from 'express';
import { Shelf } from '../models/shelf.mode';

import {
  getShelves,
  getShelfById,
  createShelf,
  updateShelf,
  deleteShelf,
} from '../service/shelf.service';
import { response } from '../utils/response';

export async function getShelvesController(
  req: Request,
  res: Response
) {
  try {
    const shelves = await getShelves();

    if (shelves) {
      return res.status(shelves.status).send(shelves);
    }
  } catch (error) {
    console.error(
      'An error occurred while fetching shelves: ',
      error
    );
    return res.status(500).send(response);
  }
}

export async function getShelfByIdController(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);
    const shelf = await getShelfById(id);

    if (shelf) {
      return res.status(shelf.status).send(shelf);
    }
  } catch (error) {
    console.error(
      'An error occurred while fetching a shelf: ',
      error
    );
    return res.status(500).send(response);
  }
}

export async function createShelfController(
  req: Request,
  res: Response
) {
  try {
    const bodyRequest: Shelf = req.body;
    const shelf = await createShelf(bodyRequest);

    if (shelf) {
      return res.status(shelf.status).send(shelf);
    }
  } catch (error) {
    console.error(
      'An error occurred while creating a shelf: ',
      error
    );
    return res.status(500).send(response);
  }
}

export async function updateShelfController(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);
    const bodyRequest: Shelf = req.body;
    const shelf = await updateShelf(id, bodyRequest);

    if (shelf) {
      return res.status(shelf.status).send(shelf);
    }
  } catch (error) {
    console.error(
      'An error occurred while updating a shelf: ',
      error
    );
    return res.status(500).send(response);
  }
}

export async function deleteShelfController(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);
    const shelf = await deleteShelf(id);

    if (shelf) {
      return res.status(shelf.status).send(shelf);
    }
  } catch (error) {
    console.error(
      'An error occurred while deleting a shelf: ',
      error
    );
    return res.status(500).send(response);
  }
}
