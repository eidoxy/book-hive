import { Router } from 'express';

import cateogryRoutes from './category';
import adminRoutes from './admin';

const router = Router();

router.use(cateogryRoutes).use(adminRoutes);

export default router;
