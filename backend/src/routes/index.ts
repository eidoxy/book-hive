import { Router } from 'express';

import adminRoutes from './admin';
import cateogryRoutes from './category';
import authorRoutes from './author';
import publisherRoutes from './publisher';

const router = Router();

router
  .use(adminRoutes)
  .use(cateogryRoutes)
  .use(authorRoutes)
  .use(publisherRoutes);

export default router;
