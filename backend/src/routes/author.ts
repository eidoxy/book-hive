import { Router } from 'express';
import { authenticateToken } from '../middleware/authenticateToken';
import { authenticateUser } from '../middleware/authenticateUser';

import {
  getAuthorsController,
  getAuthorByIdController,
  createAuthorController,
  updateAuthorController,
  deleteAuthorController,
} from '../controllers/author.controller';

const publicRoutes = Router();
const protectedRoutes = Router();

publicRoutes
  .get('/', getAuthorsController)
  .get('/:id', getAuthorByIdController);

protectedRoutes
  .use(authenticateToken, authenticateUser)
  .post('/create', createAuthorController)
  .put('/update/:id', updateAuthorController)
  .delete('/delete/:id', deleteAuthorController);

const authorRoutes = Router();
authorRoutes.use(publicRoutes);
authorRoutes.use(protectedRoutes);

export default authorRoutes;
