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
  .get('/api/borrowing', getBorrowingsController)
  .get('/api/borrowing/late', getBorrowingsLateController)
  .post('/api/borrowing/create', createBorrowingController)
  .get('/api/borrowing/:id', getBorrowingByIdController)
  .put('/api/borrowing/update/:id', updateBorrowingController)
  .delete('/api/borrowing/delete/:id', deleteBorrowingController);

export default borrowingRoutes;
