import { lazy } from 'react';

const CategoryManagement = lazy(
  () => import('../pages/Admin/Category Management')
);
const FormCreateCategory = lazy(
  () => import('../pages/Admin/Category Management/FormCreateCategory')
);
const FormEditCategory = lazy(
  () => import('../pages/Admin/Category Management/FormEditCategory')
);

const coreRoutes = [
  {
    path: '/admin/category-management',
    title: 'Category Management',
    component: CategoryManagement,
  },
  {
    path: '/admin/category-management/create',
    title: 'Create Category',
    component: FormCreateCategory,
  },
  {
    path: '/admin/category-management/edit/:id',
    title: 'Edit Category',
    component: FormEditCategory,
  },
];

const categoryRoutes = [...coreRoutes];
export default categoryRoutes;
