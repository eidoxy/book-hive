import { lazy } from 'react';

const ShelfManagement = lazy(
  () => import('../pages/Admin/Shelf Management')
);
const FormCreateShelf = lazy(
  () => import('../pages/Admin/Shelf Management/FormCreateShelf')
);
const FormEditShelf = lazy(
  () => import('../pages/Admin/Shelf Management/FormEditShelf')
);

const coreRoutes = [
  {
    path: '/admin/shelf-management',
    title: 'Shelf Management',
    component: ShelfManagement,
  },
  {
    path: '/admin/shelf-management/create',
    title: 'Create Shelf',
    component: FormCreateShelf,
  },
  {
    path: '/shelf/shelf-management/edit/:id',
    title: 'Edit Shelf',
    component: FormEditShelf,
  },
];

const shelfRoutes = [...coreRoutes];
export default shelfRoutes;
