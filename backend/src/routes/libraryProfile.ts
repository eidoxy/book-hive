import { Router } from 'express';

import {
  getLibraryProfilesController,
  updateLibraryController,
} from '../controllers/libraryProfile.controller';

const libraryProfileRoutes = Router();

libraryProfileRoutes
  .get('/', getLibraryProfilesController)
  .put('/update/:id', updateLibraryController);

export default libraryProfileRoutes;
