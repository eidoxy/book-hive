import { Router } from 'express';
import { authenticateToken } from '../middleware/authenticateToken';
import { authenticateUser } from '../middleware/authenticateUser';

import {
  getBookDetailsController,
  getBookDetailByIdController,
  createBookDetailController,
  updateBookDetailController,
  deleteBookDetailController,
} from '../controllers/bookDetail.controller';

const publicRoutes = Router();
const protectedRoutes = Router();

publicRoutes
  .get('/', getBookDetailsController)
  .get('/:id', getBookDetailByIdController);

protectedRoutes
  .use(authenticateToken, authenticateUser)
  .post('/create', createBookDetailController)
  .put('/update/:id', updateBookDetailController)
  .delete('/delete/:id', deleteBookDetailController);

const bookDetailRoutes = Router();
bookDetailRoutes.use(publicRoutes);
bookDetailRoutes.use(protectedRoutes);

export default bookDetailRoutes;
