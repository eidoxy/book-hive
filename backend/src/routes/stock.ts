import { Router } from 'express';

import {
  getStocksController,
  getStockByIdController,
  createStockController,
  updateStockController,
  deleteStockController,
} from '../controllers/stock.controller';

const stockRoutes = Router();

stockRoutes
  .get('/', getStocksController)
  .get('/:id', getStockByIdController)
  .post('/create', createStockController)
  .put('/update/:id', updateStockController)
  .delete('/delete/:id', deleteStockController);

export default stockRoutes;
