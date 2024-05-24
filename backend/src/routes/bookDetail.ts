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
  .get('/', getBookDetailsController)
  .get('/:id', getBookDetailByIdController)
  .post('/create', createBookDetailController)
  .put('/update/:id', updateBookDetailController)
  .delete('/delete/:id', deleteBookDetailController);

export default bookDetailRoutes;
