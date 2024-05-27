import { lazy } from 'react';

const StockManagement = lazy(
  () => import('../pages/Admin/Stock Management')
);
const FormCreateStock = lazy(
  () => import('../pages/Admin/Stock Management/FormCreateStock')
);
const FormEditStock = lazy(
  () => import('../pages/Admin/Stock Management/FormEditStock')
);

const coreRoutes = [
  {
    path: '/admin/stock-management',
    title: 'Stock Management',
    component: StockManagement,
  },
  {
    path: '/admin/stock-management/create',
    title: 'Create Stock',
    component: FormCreateStock,
  },
  {
    path: '/stock/stock-management/edit/:id',
    title: 'Edit Stock',
    component: FormEditStock,
  },
];

const stockRoutes = [...coreRoutes];
export default stockRoutes;
