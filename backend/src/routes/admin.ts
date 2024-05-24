import { Router } from 'express';

import {
  createAdminController,
  loginAdminController,
  getAdminsController,
  getAdminByIdController,
  updateAdminController,
  deleteAdminController,
} from '../controllers/admin.controller';

const adminRoutes = Router();

adminRoutes
  .get('/', getAdminsController)
  .post('/login', loginAdminController)
  .get('/:id', getAdminByIdController)
  .post('/create', createAdminController)
  .put('/update/:id', updateAdminController)
  .delete('/delete/:id', deleteAdminController);

export default adminRoutes;
