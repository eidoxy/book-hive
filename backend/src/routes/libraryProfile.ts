import { Router } from 'express';
import { authenticateToken } from '../middleware/authenticateToken';
import { authenticateUser } from '../middleware/authenticateUser';

import {
  getLibraryProfilesController,
  updateLibraryController,
} from '../controllers/libraryProfile.controller';

const publicRoutes = Router();
const protectedRoutes = Router();

publicRoutes.get('/', getLibraryProfilesController);

protectedRoutes
  .use(authenticateToken, authenticateUser)
  .put('/update/:id', updateLibraryController);

const libraryProfileRoutes = Router();
libraryProfileRoutes.use(publicRoutes);
libraryProfileRoutes.use(protectedRoutes);

export default libraryProfileRoutes;
