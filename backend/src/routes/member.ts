import { Router } from 'express';

import {
  registerMemberController,
  loginMemberController,
  getMembersController,
  getMemberByIdController,
  updateMemberController,
  deleteMemberController,
} from '../controllers/member.controller';

const memberRoutes = Router();

memberRoutes
  .get('/api/member', getMembersController)
  .get('/api/member/:id', getMemberByIdController)
  .post('/api/member/register', registerMemberController)
  .post('/api/member/login', loginMemberController)
  .put('/api/member/update/:id', updateMemberController)
  .delete('/api/member/delete/:id', deleteMemberController);

export default memberRoutes;
