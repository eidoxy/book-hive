import { Router } from 'express';

import {
  getCategoriesController,
  getCategoryByIdController,
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
} from '../controllers/category.controller';

const categoryRoutes = Router();

categoryRoutes
  .get('/api/category', getCategoriesController)
  .get('/api/category/:id', getCategoryByIdController)
  .post('/api/category/create', createCategoryController)
  .put('/api/category/update/:id', updateCategoryController)
  .delete('/api/category/delete/:id', deleteCategoryController);

export default categoryRoutes;
