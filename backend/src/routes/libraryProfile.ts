import { Router } from 'express';

import {
  getLibraryProfilesController,
  updateLibraryController,
} from '../controllers/libraryProfile.controller';

const libraryProfileRoutes = Router();

libraryProfileRoutes
  .get('/api/library-profile', getLibraryProfilesController)
  .put('/api/library-profile/update/:id', updateLibraryController);

export default libraryProfileRoutes;
