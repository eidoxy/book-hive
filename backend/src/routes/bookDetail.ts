import { Router } from 'express';

import {
  getBookDetailsController,
  getBookDetailByIdController,
  createBookDetailController,
  updateBookDetailController,
  deleteBookDetailController,
} from '../controllers/bookDetail.controller';

const bookDetailRoutes = Router();

bookDetailRoutes
  .get('/api/book-detail', getBookDetailsController)
  .get('/api/book-detail/:id', getBookDetailByIdController)
  .post('/api/book-detail/create', createBookDetailController)
  .put('/api/book-detail/update/:id', updateBookDetailController)
  .delete('/api/book-detail/delete/:id', deleteBookDetailController);

export default bookDetailRoutes;
