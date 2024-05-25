import { Router } from 'express';
import { authenticateToken } from '../middleware/authenticateToken';
import { authenticateUser } from '../middleware/authenticateUser';

import {
  getBorrowingsController,
  getBorrowingByIdController,
  getBorrowingsLateController,
  createBorrowingController,
  updateBorrowingController,
  deleteBorrowingController,
} from '../controllers/borrowing.controller';

const publicRoutes = Router();
const protectedRoutes = Router();

publicRoutes
  .get('/', getBorrowingsController)
  .get('/:id', getBorrowingByIdController);

protectedRoutes
  .use(authenticateToken, authenticateUser)
  .get('/late-borrowing', getBorrowingsLateController)
  .post('/create', createBorrowingController)
  .put('/update/:id', updateBorrowingController)
  .delete('/delete/:id', deleteBorrowingController);

const borrowingRoutes = Router();
borrowingRoutes.use(publicRoutes);
borrowingRoutes.use(protectedRoutes);

export default borrowingRoutes;
