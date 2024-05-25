import { Router } from 'express';
import { authenticateToken } from '../middleware/authenticateToken';
import { authenticateUser } from '../middleware/authenticateUser';

import {
  getShelvesController,
  getShelfByIdController,
  createShelfController,
  updateShelfController,
  deleteShelfController,
} from '../controllers/shelf.controller';

const publicRoutes = Router();
const protectedRoutes = Router();

publicRoutes
  .get('/', getShelvesController)
  .get('/:id', getShelfByIdController);

protectedRoutes
  .use(authenticateToken, authenticateUser)
  .post('/create', createShelfController)
  .put('/update/:id', updateShelfController)
  .delete('/delete/:id', deleteShelfController);

const shelfRoutes = Router();
shelfRoutes.use(publicRoutes);
shelfRoutes.use(protectedRoutes);

export default shelfRoutes;
