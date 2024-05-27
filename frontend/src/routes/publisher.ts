import { lazy } from 'react';

const PublisherManagement = lazy(
  () => import('../pages/Admin/Publisher Management')
);
const FormCreatePublisher = lazy(
  () => import('../pages/Admin/Publisher Management/FormCreatePublisher')
);
const FormEditPublisher = lazy(
  () => import('../pages/Admin/Publisher Management/FormEditPublisher.tsx')
);

const coreRoutes = [
  {
    path: '/admin/publisher-management',
    title: 'Publisher Management',
    component: PublisherManagement,
  },
  {
    path: '/admin/publisher-management/create',
    title: 'Create Publisher',
    component: FormCreatePublisher,
  },
  {
    path: '/publisher/publisher-management/edit/:id',
    title: 'Edit Publisher',
    component: FormEditPublisher,
  },
];

const publisherRoutes = [...coreRoutes];
export default publisherRoutes;
