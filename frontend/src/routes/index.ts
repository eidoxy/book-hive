import { lazy } from 'react';

import adminRoutes from './admin';
import authorRoutes from './author';
import bookRoutes from './book';
import bookDetailRoutes from './bookDetail';
import borrowingRoutes from './borrowing';
import categoryRoutes from './category';
import memberRoutes from './member';
import publisherRoutes from './publisher';
import shelfRoutes from './shelf';
import stockRoutes from './stock';

const Dashboard = lazy(() => import('../pages/Admin/Dashboard'));

const Settings = lazy(() => import('../pages/Settings'));

const privateRoutes = [
  {
    path: '/admin/dashboard',
    title: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/admin/settings',
    title: 'Settings',
    component: Settings,
  },
];

const publicRoutes = [
  {
    path: '/all-books',
    title: 'All Books',
    component: '',
  },
];

const routes = [
  ...privateRoutes,
  ...publicRoutes,
  ...adminRoutes,
  ...authorRoutes,
  ...bookRoutes,
  ...bookDetailRoutes,
  ...borrowingRoutes,
  ...categoryRoutes,
  ...memberRoutes,
  ...publisherRoutes,
  ...shelfRoutes,
  ...stockRoutes,
];
export default routes;
