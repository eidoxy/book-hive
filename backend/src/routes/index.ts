import { Router } from 'express';

import adminRoutes from './admin';
import cateogryRoutes from './category';
import authorRoutes from './author';

const router = Router();

router.use(adminRoutes).use(cateogryRoutes).use(authorRoutes);

export default router;
