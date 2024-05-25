import { Router } from 'express';
import { authenticateToken } from '../middleware/authenticateToken';
import { authenticateUser } from '../middleware/authenticateUser';

import {
  createAdminController,
  loginAdminController,
  getAdminsController,
  getAdminByIdController,
  updateAdminController,
  deleteAdminController,
} from '../controllers/admin.controller';

const publicRoutes = Router();
const protectedRoutes = Router();

publicRoutes.post('/login', loginAdminController);

protectedRoutes
  .use(authenticateToken, authenticateUser)
  .get('/', getAdminsController)
  .get('/:id', getAdminByIdController)
  .post('/create', createAdminController)
  .put('/update/:id', updateAdminController)
  .delete('/delete/:id', deleteAdminController);

const adminRoutes = Router();
adminRoutes.use(publicRoutes);
adminRoutes.use(protectedRoutes);

export default adminRoutes;
