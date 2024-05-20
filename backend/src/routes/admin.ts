import { Router } from 'express';

import {
  createAdminController,
  getAdminsController,
  getAdminByIdController,
  updateAdminController,
  deleteAdminController,
} from '../controllers/admin.controller';

const adminRoutes = Router();

adminRoutes
  .get('/api/admin', getAdminsController)
  .get('/api/admin/:id', getAdminByIdController)
  .post('/api/admin/create', createAdminController)
  .put('/api/admin/update/:id', updateAdminController)
  .delete('/api/admin/delete/:id', deleteAdminController);

export default adminRoutes;
