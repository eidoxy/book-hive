import { Response, Request } from 'express';
import { Publisher } from '../models/publisher.model';

import {
  getPublishers,
  getPublisherById,
  createPublisher,
  updatePublisher,
  deletePublisher,
} from '../service/publisher.service';
import { response } from '../utils/response';

export async function getPublishersController(
  req: Request,
  res: Response
) {
  try {
    const publishers = await getPublishers();

    if (publishers) {
      return res.status(publishers.status).send(publishers);
    }
  } catch (error) {
    console.error(
      'An error occurred while fetching publishers: ',
      error
    );
    return res.status(500).send(response);
  }
}

export async function getPublisherByIdController(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);
    const publisher = await getPublisherById(id);

    if (publisher) {
      return res.status(publisher.status).send(publisher);
    }
  } catch (error) {
    console.error(
      'An error occurred while fetching a publisher: ',
      error
    );
    return res.status(500).send(response);
  }
}

export async function createPublisherController(
  req: Request,
  res: Response
) {
  try {
    const bodyRequest: Publisher = req.body;
    const publisher = await createPublisher(bodyRequest);

    if (publisher) {
      return res.status(publisher.status).send(publisher);
    }
  } catch (error) {
    console.error(
      'An error occurred while creating a publisher: ',
      error
    );
    return res.status(500).send(response);
  }
}

export async function updatePublisherController(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);
    const bodyRequest: Publisher = req.body;
    const publisher = await updatePublisher(id, bodyRequest);

    if (publisher) {
      return res.status(publisher.status).send(publisher);
    }
  } catch (error) {
    console.error(
      'An error occurred while updating a publisher: ',
      error
    );
    return res.status(500).send(response);
  }
}

export async function deletePublisherController(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);
    const publisher = await deletePublisher(id);

    if (publisher) {
      return res.status(publisher.status).send(publisher);
    }
  } catch (error) {
    console.error(
      'An error occurred while deleting a publisher: ',
      error
    );
    return res.status(500).send(response);
  }
}
