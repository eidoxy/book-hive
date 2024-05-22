import { Router } from 'express';

import adminRoutes from './admin';
import memberRoutes from './member';
import cateogryRoutes from './category';
import authorRoutes from './author';
import publisherRoutes from './publisher';
import shelfRoutes from './shelf';

const router = Router();

router
  .use(adminRoutes)
  .use(memberRoutes)
  .use(cateogryRoutes)
  .use(authorRoutes)
  .use(publisherRoutes)
  .use(shelfRoutes);

export default router;
