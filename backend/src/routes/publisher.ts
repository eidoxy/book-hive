import { Router } from 'express';

import {
  getPublishersController,
  getPublisherByIdController,
  createPublisherController,
  updatePublisherController,
  deletePublisherController,
} from '../controllers/publisher.controller';

const publisherRoutes = Router();

publisherRoutes
  .get('/', getPublishersController)
  .get('/:id', getPublisherByIdController)
  .post('/create', createPublisherController)
  .put('/update/:id', updatePublisherController)
  .delete('/delete/:id', deletePublisherController);

export default publisherRoutes;
