import { Response, Request } from 'express';
import { LibraryProfile } from '../models/libraryProfile.mode';

import {
  getLibraryProfiles,
  updateLibrary,
} from '../service/libraryProfile.service';
import { response } from '../utils/response';

export async function getLibraryProfilesController(
  req: Request,
  res: Response
) {
  try {
    const libraryProfiles = await getLibraryProfiles();

    if (libraryProfiles) {
      return res.status(libraryProfiles.status).send(libraryProfiles);
    }
  } catch (error) {
    console.error(
      'An error occurred while fetching library profiles: ',
      error
    );
    return res.status(500).send(response);
  }
}

export async function updateLibraryController(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);
    const bodyRequest: LibraryProfile = req.body;
    const libraryProfile = await updateLibrary(id, bodyRequest);

    if (libraryProfile) {
      return res.status(libraryProfile.status).send(libraryProfile);
    }
  } catch (error) {
    console.error(
      'An error occurred while updating a library profile: ',
      error
    );
    return res.status(500).send(response);
  }
}
