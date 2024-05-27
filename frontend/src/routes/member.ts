import { lazy } from 'react';

const MemberManagement = lazy(
  () => import('../pages/Admin/Member Management')
);
const FormEditMember = lazy(
  () => import('../pages/Admin/Member Management/FormEditMember')
);

const coreRoutes = [
  {
    path: '/admin/member-management',
    title: 'Member Management',
    component: MemberManagement,
  },
  {
    path: '/admin/member-management/edit/:id',
    title: 'Edit Member',
    component: FormEditMember,
  },
];

const memberRoutes = [...coreRoutes];
export default memberRoutes;
