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
  .get('/api/shelf', getShelvesController)
  .get('/api/shelf/:id', getShelfByIdController)
  .post('/api/shelf/create', createShelfController)
  .put('/api/shelf/update/:id', updateShelfController)
  .delete('/api/shelf/delete/:id', deleteShelfController);

export default shelfRoutes;
