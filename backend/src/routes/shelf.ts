import { Router } from 'express';

import {
  getShelvesController,
  getShelfByIdController,
  createShelfController,
  updateShelfController,
  deleteShelfController,
} from '../controllers/shelf.controller';

const shelfRoutes = Router();

shelfRoutes
  .get('/', getShelvesController)
  .get('/:id', getShelfByIdController)
  .post('/create', createShelfController)
  .put('/update/:id', updateShelfController)
  .delete('/delete/:id', deleteShelfController);

export default shelfRoutes;
