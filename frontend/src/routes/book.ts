import { lazy } from 'react';

const BookManagement = lazy(
  () => import('../pages/Admin/Book Management')
);
const FormCreateBook = lazy(
  () => import('../pages/Admin/Book Management/FormCreateBook')
);
const FormEditBook = lazy(
  () => import('../pages/Admin/Book Management/FormEditBook')
);

const coreRoutes = [
  {
    path: '/admin/book-management',
    title: 'Book Management',
    component: BookManagement,
  },
  {
    path: '/admin/book-management/create',
    title: 'Create Book',
    component: FormCreateBook,
  },
  {
    path: '/admin/book-management/edit/:id',
    title: 'Edit Book',
    component: FormEditBook,
  },
];

const bookRoutes = [...coreRoutes];
export default bookRoutes;
