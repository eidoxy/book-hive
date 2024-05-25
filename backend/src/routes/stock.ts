import { Router } from 'express';
import { authenticateToken } from '../middleware/authenticateToken';
import { authenticateUser } from '../middleware/authenticateUser';

import {
  getStocksController,
  getStockByIdController,
  createStockController,
  updateStockController,
  deleteStockController,
} from '../controllers/stock.controller';

const publicRoutes = Router();
const protectedRoutes = Router();

publicRoutes
  .get('/', getStocksController)
  .get('/:id', getStockByIdController);

protectedRoutes
  .use(authenticateToken, authenticateUser)
  .post('/create', createStockController)
  .put('/update/:id', updateStockController)
  .delete('/delete/:id', deleteStockController);

const stockRoutes = Router();
stockRoutes.use(publicRoutes);
stockRoutes.use(protectedRoutes);

export default stockRoutes;
