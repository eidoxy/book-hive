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
  .get('/', getCategoriesController)
  .get('/:id', getCategoryByIdController)
  .post('/create', createCategoryController)
  .put('/update/:id', updateCategoryController)
  .delete('/delete/:id', deleteCategoryController);

export default categoryRoutes;
