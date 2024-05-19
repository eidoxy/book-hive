import { Router } from 'express';

import {
  getAuthorsController,
  getAuthorByIdController,
  createAuthorController,
  updateAuthorController,
  deleteAuthorController,
} from '../controllers/author.controller';

const authorRoutes = Router();

authorRoutes
  .get('/api/author', getAuthorsController)
  .get('/api/author/:id', getAuthorByIdController)
  .post('/api/author/create', createAuthorController)
  .put('/api/author/update/:id', updateAuthorController)
  .delete('/api/author/delete/:id', deleteAuthorController);

export default authorRoutes;
