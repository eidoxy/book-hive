import { lazy } from 'react';

const BookDetailManagement = lazy(
  () => import('../pages/Admin/Book Detail Management')
);
const FormCreateBookDetail = lazy(
  () =>
    import('../pages/Admin/Book Detail Management/FormCreateBookDetail')
);
const FormEditBookDetail = lazy(
  () => import('../pages/Admin/Book Detail Management/FormEditBookDetail')
);

const coreRoutes = [
  {
    path: '/admin/book-detail-management',
    title: 'Book Detail Management',
    component: BookDetailManagement,
  },
  {
    path: '/admin/book-detail-management/create',
    title: 'Create Book Detail',
    component: FormCreateBookDetail,
  },
  {
    path: '/admin/book-detail-management/edit/:id',
    title: 'Edit Book Detail',
    component: FormEditBookDetail,
  },
];

const bookDetailRoutes = [...coreRoutes];
export default bookDetailRoutes;
