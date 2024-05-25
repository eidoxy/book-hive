import { Router } from 'express';
import { authenticateToken } from '../middleware/verification';

import {
  createAdminController,
  loginAdminController,
  getAdminsController,
  getAdminByIdController,
  updateAdminController,
  deleteAdminController,
} from '../controllers/admin.controller';

const adminRoutes = Router();

// ? : add authenticateToken middleware to protect the routes
adminRoutes.use(authenticateToken);

adminRoutes
  .get('/', getAdminsController)
  .post('/login', loginAdminController)
  .get('/:id', getAdminByIdController)
  .post('/create', createAdminController)
  .put('/update/:id', updateAdminController)
  .delete('/delete/:id', deleteAdminController);

export default adminRoutes;
