import { lazy } from 'react';

const Dashboard = lazy(() => import('../pages/Admin/Dashboard'));
const AdminManagement = lazy(
  () => import('../pages/Admin/Admin Management')
);
const AuthorManagement = lazy(
  () => import('../pages/Admin/Author Management')
);
const BookDetailManagement = lazy(
  () => import('../pages/Admin/Book Detail Management')
);
const BookManagement = lazy(
  () => import('../pages/Admin/Book Management')
);
const BorrowingManagement = lazy(
  () => import('../pages/Admin/Borrowing Management')
);
const CategoryManagement = lazy(
  () => import('../pages/Admin/Category Management')
);
const MemberManagement = lazy(
  () => import('../pages/Admin/Member Management')
);
const PublisherManagement = lazy(
  () => import('../pages/Admin/Publisher Management')
);
const ShelfManagement = lazy(
  () => import('../pages/Admin/Shelf Management')
);
const StockManagement = lazy(
  () => import('../pages/Admin/Stock Management')
);

const Settings = lazy(() => import('../pages/Settings'));

const adminRoutes = [
  {
    path: '/admin/dashboard',
    title: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/admin/admin-management',
    title: 'Admin Management',
    component: AdminManagement,
  },
  {
    path: '/admin/author-management',
    title: 'Author Management',
    component: AuthorManagement,
  },
  {
    path: '/admin/book-detail-management',
    title: 'Book Detail Management',
    component: BookDetailManagement,
  },
  {
    path: '/admin/book-management',
    title: 'Book Management',
    component: BookManagement,
  },
  {
    path: '/admin/borrowing-management',
    title: 'Borrowing Management',
    component: BorrowingManagement,
  },
  {
    path: '/admin/category-management',
    title: 'Category Management',
    component: CategoryManagement,
  },
  {
    path: '/admin/member-management',
    title: 'Member Management',
    component: MemberManagement,
  },
  {
    path: '/admin/publisher-management',
    title: 'Publisher Management',
    component: PublisherManagement,
  },
  {
    path: '/admin/shelf-management',
    title: 'Shelf Management',
    component: ShelfManagement,
  },
  {
    path: '/admin/stock-management',
    title: 'Stock Management',
    component: StockManagement,
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
];

const publicRoutes = [
  {
    path: '/all-books',
    title: 'All Books',
    component: '',
  },
];

const routes = [...adminRoutes, ...publicRoutes];
export default routes;
