import { Router } from 'express';
import { authenticateToken } from '../middleware/authenticateToken';
import { authenticateUser } from '../middleware/authenticateUser';

import {
  getBorrowingsController,
  getBorrowingByIdController,
  getBorrowingsByMemberController,
  getBorrowingsLateController,
  createBorrowingController,
  returnBorrowingController,
  updateBorrowingController,
  deleteBorrowingController,
} from '../controllers/borrowing.controller';

const publicRoutes = Router();
const protectedRoutes = Router();

publicRoutes
  .get('/', getBorrowingsController)
  .get('/late', getBorrowingsLateController)
  .get('/member/:id', getBorrowingsByMemberController)
  .get('/:id', getBorrowingByIdController);

protectedRoutes
  .use(authenticateToken, authenticateUser)
  .post('/create', createBorrowingController)
  .put('/update/:id', updateBorrowingController)
  .put('/return/:id', returnBorrowingController)
  .delete('/delete/:id', deleteBorrowingController);

const borrowingRoutes = Router();
borrowingRoutes.use(publicRoutes);
borrowingRoutes.use(protectedRoutes);

export default borrowingRoutes;
