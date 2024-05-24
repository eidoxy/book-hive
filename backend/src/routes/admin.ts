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
  .get('/', getAdminsController)
  .get('/:id', getAdminByIdController)
  .post('/create', createAdminController)
  .put('/update/:id', updateAdminController)
  .delete('/delete/:id', deleteAdminController);

export default adminRoutes;
