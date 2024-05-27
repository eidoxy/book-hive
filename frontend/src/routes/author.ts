import { lazy } from 'react';

const AuthorManagement = lazy(
  () => import('../pages/Admin/Author Management')
);
const FormCreateAuthor = lazy(
  () => import('../pages/Admin/Author Management/FormCreateAuthor')
);
const FormEditAuthor = lazy(
  () => import('../pages/Admin/Author Management/FormEditAuthor')
);

const coreRoutes = [
  {
    path: '/admin/author-management',
    title: 'Author Management',
    component: AuthorManagement,
  },
  {
    path: '/admin/author-management/create',
    title: 'Create Author',
    component: FormCreateAuthor,
  },
  {
    path: '/admin/author-management/edit/:id',
    title: 'Edit Author',
    component: FormEditAuthor,
  },
];

const authorRoutes = [...coreRoutes];
export default authorRoutes;
