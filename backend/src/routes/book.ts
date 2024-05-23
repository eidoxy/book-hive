import { Router } from 'express';

import {
  getBooksController,
  getBookByIdController,
  createBookController,
  updateBookController,
  deleteBookController,
} from '../controllers/book.controller';

const bookRoutes = Router();

bookRoutes
  .get('/api/book', getBooksController)
  .get('/api/book/:id', getBookByIdController)
  .post('/api/book/create', createBookController)
  .put('/api/book/update/:id', updateBookController)
  .delete('/api/book/delete/:id', deleteBookController);

export default bookRoutes;
