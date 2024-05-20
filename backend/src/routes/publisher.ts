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
  .get('/api/publisher', getPublishersController)
  .get('/api/publisher/:id', getPublisherByIdController)
  .post('/api/publisher/create', createPublisherController)
  .put('/api/publisher/update/:id', updatePublisherController)
  .delete('/api/publisher/delete/:id', deletePublisherController);

export default publisherRoutes;
