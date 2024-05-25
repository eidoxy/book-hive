import { Router } from 'express';
import { authenticateToken } from '../middleware/authenticateToken';
import { authenticateUser } from '../middleware/authenticateUser';

import {
  getCategoriesController,
  getCategoryByIdController,
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
} from '../controllers/category.controller';

const publicRoutes = Router();
const protectedRoutes = Router();

publicRoutes
  .get('/', getCategoriesController)
  .get('/:id', getCategoryByIdController);

protectedRoutes
  .use(authenticateToken, authenticateUser)
  .post('/create', createCategoryController)
  .put('/update/:id', updateCategoryController)
  .delete('/delete/:id', deleteCategoryController);

const categoryRoutes = Router();
categoryRoutes.use(publicRoutes);
categoryRoutes.use(protectedRoutes);

export default categoryRoutes;
