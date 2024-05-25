import { Router } from 'express';
import { authenticateToken } from '../middleware/authenticateToken';
import { authenticateUser } from '../middleware/authenticateUser';

import {
  getPublishersController,
  getPublisherByIdController,
  createPublisherController,
  updatePublisherController,
  deletePublisherController,
} from '../controllers/publisher.controller';

const publicRoutes = Router();
const protectedRoutes = Router();

publicRoutes
  .get('/', getPublishersController)
  .get('/:id', getPublisherByIdController);

protectedRoutes
  .use(authenticateToken, authenticateUser)
  .post('/create', createPublisherController)
  .put('/update/:id', updatePublisherController)
  .delete('/delete/:id', deletePublisherController);

const publisherRoutes = Router();
publisherRoutes.use(publicRoutes);
publisherRoutes.use(protectedRoutes);

export default publisherRoutes;
