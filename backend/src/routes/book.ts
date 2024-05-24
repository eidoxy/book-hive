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
  .get('/', getBooksController)
  .get('/:id', getBookByIdController)
  .post('/create', createBookController)
  .put('/update/:id', updateBookController)
  .delete('/delete/:id', deleteBookController);

export default bookRoutes;
