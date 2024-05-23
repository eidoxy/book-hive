import { Router } from 'express';

import adminRoutes from './admin';
import memberRoutes from './member';
import cateogryRoutes from './category';
import authorRoutes from './author';
import publisherRoutes from './publisher';
import shelfRoutes from './shelf';
import libraryProfileRoutes from './libraryProfile';
import bookRoutes from './book';
import bookDetailRoutes from './bookDetail';
import stockRoutes from './stock';

const router = Router();

router
  .use(adminRoutes)
  .use(memberRoutes)
  .use(cateogryRoutes)
  .use(authorRoutes)
  .use(publisherRoutes)
  .use(shelfRoutes)
  .use(libraryProfileRoutes)
  .use(bookRoutes)
  .use(bookDetailRoutes)
  .use(stockRoutes);

export default router;
