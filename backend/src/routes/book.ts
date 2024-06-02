import { Router } from 'express';
import multer from 'multer';
import storage from '../utils/storage';
import { authenticateToken } from '../middleware/authenticateToken';
import { authenticateUser } from '../middleware/authenticateUser';

import {
  getBooksController,
  getBookByIdController,
  getBookListController,
  getBookRecomendationController,
  getBookPopularController,
  getBookByCategoryController,
  createBookController,
  updateBookController,
  deleteBookController,
} from '../controllers/book.controller';

const publicRoutes = Router();
const protectedRoutes = Router();
const upload = multer({ storage });

publicRoutes
  .get('/', getBooksController)
  .get('/list', getBookListController)
  .get('/recommendation', getBookRecomendationController)
  .get('/popular', getBookPopularController)
  .get('/category/:id', getBookByCategoryController)
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
