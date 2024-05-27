import { lazy } from 'react';

const BorrowingManagement = lazy(
  () => import('../pages/Admin/Borrowing Management')
);
const FormCreateBorrowing = lazy(
  () => import('../pages/Admin/Borrowing Management/FormCreateBorrowing')
);
const FormEditBorrowing = lazy(
  () => import('../pages/Admin/Borrowing Management/FormEditBorrowing')
);

const coreRoutes = [
  {
    path: '/admin/borrowing-management',
    title: 'Borrowing Management',
    component: BorrowingManagement,
  },
  {
    path: '/admin/borrowing-management/create',
    title: 'Create Borrowing',
    component: FormCreateBorrowing,
  },
  {
    path: '/admin/borrowing-management/edit/:id',
    title: 'Edit Borrowing',
    component: FormEditBorrowing,
  },
];

const borrowingRoutes = [...coreRoutes];
export default borrowingRoutes;
