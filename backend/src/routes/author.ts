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
  .get('/', getAuthorsController)
  .get('/:id', getAuthorByIdController)
  .post('/create', createAuthorController)
  .put('/update/:id', updateAuthorController)
  .delete('/delete/:id', deleteAuthorController);

export default authorRoutes;
