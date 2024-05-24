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
  .get('/', getMembersController)
  .get('/:id', getMemberByIdController)
  .post('/register', registerMemberController)
  .post('/login', loginMemberController)
  .put('/update/:id', updateMemberController)
  .delete('/delete/:id', deleteMemberController);

export default memberRoutes;
