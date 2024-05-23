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
  .get('/api/stock', getStocksController)
  .get('/api/stock/:id', getStockByIdController)
  .post('/api/stock/create', createStockController)
  .put('/api/stock/update/:id', updateStockController)
  .delete('/api/stock/delete/:id', deleteStockController);

export default stockRoutes;
