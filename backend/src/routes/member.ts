import { Router } from 'express';
import { authenticateToken } from '../middleware/authenticateToken';
import { authenticateUser } from '../middleware/authenticateUser';

import {
  registerMemberController,
  loginMemberController,
  getMembersController,
  getMemberByIdController,
  updateMemberController,
  deleteMemberController,
} from '../controllers/member.controller';

const publicRoutes = Router();
const protectedRoutes = Router();

publicRoutes
  .get('/', getMembersController)
  .get('/:id', getMemberByIdController)
  .post('/register', registerMemberController)
  .post('/login', loginMemberController)
  .put('/update/:id', updateMemberController);

protectedRoutes
  .use(authenticateToken, authenticateUser)
  .delete('/delete/:id', deleteMemberController);

const memberRoutes = Router();
memberRoutes.use(publicRoutes);
memberRoutes.use(protectedRoutes);

export default memberRoutes;
