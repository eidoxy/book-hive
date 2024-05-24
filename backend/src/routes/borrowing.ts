import { Router } from 'express';

import {
  getBorrowingsController,
  getBorrowingByIdController,
  getBorrowingsLateController,
  createBorrowingController,
  updateBorrowingController,
  deleteBorrowingController,
} from '../controllers/borrowing.controller';

const borrowingRoutes = Router();

borrowingRoutes
  .get('/', getBorrowingsController)
  .get('/late', getBorrowingsLateController)
  .post('/create', createBorrowingController)
  .get('/:id', getBorrowingByIdController)
  .put('/update/:id', updateBorrowingController)
  .delete('/delete/:id', deleteBorrowingController);

export default borrowingRoutes;
