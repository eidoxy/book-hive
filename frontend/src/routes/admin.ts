import { lazy } from 'react';

const AdminManagement = lazy(
  () => import('../pages/Admin/Admin Management')
);
const FormCreateAdmin = lazy(
  () => import('../pages/Admin/Admin Management/FormCreateAdmin')
);
const FormEditAdmin = lazy(
  () => import('../pages/Admin/Admin Management/FormEditAdmin')
);

const coreRoutes = [
  {
    path: '/admin/admin-management',
    title: 'Admin Management',
    component: AdminManagement,
  },
  {
    path: '/admin/admin-management/create',
    title: 'Create Admin',
    component: FormCreateAdmin,
  },
  {
    path: '/admin/admin-management/edit/:id',
    title: 'Edit Admin',
    component: FormEditAdmin,
  },
];

const adminRoutes = [...coreRoutes];
export default adminRoutes;
