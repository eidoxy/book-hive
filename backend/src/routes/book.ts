import { Router } from 'express';
import { authenticateToken } from '../middleware/authenticateToken';
import { authenticateUser } from '../middleware/authenticateUser';

import {
  getBooksController,
  getBookByIdController,
  createBookController,
  updateBookController,
  deleteBookController,
} from '../controllers/book.controller';

const publicRoutes = Router();
const protectedRoutes = Router();

publicRoutes
  .get('/', getBooksController)
  .get('/:id', getBookByIdController);

protectedRoutes
  .use(authenticateToken, authenticateUser)
  .post('/create', createBookController)
  .put('/update/:id', updateBookController)
  .delete('/delete/:id', deleteBookController);

const bookRoutes = Router();
bookRoutes.use(publicRoutes);
bookRoutes.use(protectedRoutes);

export default bookRoutes;
