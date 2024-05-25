import { Response, Request } from 'express';
import { LibraryProfile } from '../models/libraryProfile.mode';

import {
  getLibraryProfiles,
  updateLibrary,
} from '../service/libraryProfile.service';
import { serverError } from '../utils/response';

export async function getLibraryProfilesController(
  req: Request,
  res: Response
) {
  try {
    const result = await getLibraryProfiles();

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
      'An error occurred while getting library profiles: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}

export async function updateLibraryController(
  req: Request,
  res: Response
) {
  const id = Number(req.params.id);

  // ? : check if id is not a number
  if (isNaN(id)) {
    return res.status(400).send({
      status: 400,
      message: 'Invalid library profile ID',
    });
  }

  const bodyRequest: LibraryProfile = req.body;

  // ? : check if name, address, email and year established is empty
  if (
    !bodyRequest.name ||
    !bodyRequest.address ||
    !bodyRequest.email ||
    !bodyRequest.year_established
  ) {
    return res.status(400).send({
      status: 400,
      message:
        'Name, address, email, and year established are required',
    });
  }

  try {
    const result = await updateLibrary(id, bodyRequest);

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
      'An error occurred while updating a library profile: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}
