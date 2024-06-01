import { Router } from 'express';
import multer from 'multer';
import storage from '../utils/storage';
import { authenticateToken } from '../middleware/authenticateToken';
import { authenticateUser } from '../middleware/authenticateUser';

import {
  getBooksController,
  getBookByIdController,
  getBookRecomendationController,
  createBookController,
  updateBookController,
  deleteBookController,
} from '../controllers/book.controller';

const publicRoutes = Router();
const protectedRoutes = Router();
const upload = multer({ storage });

publicRoutes
  .get('/', getBooksController)
  .get('/recommendation', getBookRecomendationController)
  .get('/:id', getBookByIdController);

protectedRoutes
  .use(authenticateToken, authenticateUser)
  .post('/create', upload.single('cover'), createBookController)
  .put('/update/:id', updateBookController)
  .delete('/delete/:id', deleteBookController);

const bookRoutes = Router();
bookRoutes.use(publicRoutes);
bookRoutes.use(protectedRoutes);

export default bookRoutes;
