import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup';

import Logo from '../images/logo/logo-no-bg.png';
import iconDashboard from '../images/icons/icon-dashboard.svg';
import iconBorrowing from '../images/icons/icon-borrowing.svg';
import iconBook from '../images/icons/icon-book.svg';
import iconBookDetail from '../images/icons/icon-book-detail.svg';
import iconStock from '../images/icons/icon-stock.svg';
import iconCategory from '../images/icons/icon-category.svg';
import iconAuthor from '../images/icons/icon-author.svg';
import iconPublisher from '../images/icons/icon-publisher.svg';
import iconShelf from '../images/icons/icon-shelf.svg';
import iconAdmin from '../images/icons/icon-admin.svg';
import iconMember from '../images/icons/icon-member.svg';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null
      ? false
      : storedSidebarExpanded === 'true'
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-primary duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-center gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/">
          <div className="flex items-center justify-center">
            <h1 className="font-bold text-4xl">
              <span className="text-white">BOOK</span>
              <span className="text-secondary">HIVE</span>
            </h1>
          </div>
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-white">
              MENU
            </h3>
            <hr className="my-6 border-gray dark:border-meta-4" />
            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Dashboard --> */}
              <li>
                <NavLink
                  to="/admin/dashboard"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-white duration-300 ease-in-out hover:bg-primary-dark dark:hover:bg-meta-4 ${
                    pathname.includes('dashboard') &&
                    'bg-primary-dark dark:bg-meta-4'
                  }`}
                >
                  <img src={iconDashboard} alt="Dashboard" />
                  Dashboard
                </NavLink>
              </li>
              {/* <!-- Menu Item Dashboard --> */}

              {/* <!-- Menu Item Borrowing Management --> */}
              <li>
                <NavLink
                  to="/admin/borrowing-management"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-white duration-300 ease-in-out hover:bg-primary-dark dark:hover:bg-meta-4 ${
                    pathname.includes('borrowing-management') &&
                    'bg-primary-dark dark:bg-meta-4'
                  }`}
                >
                  <img src={iconBorrowing} alt="Borrowing" />
                  Borrowings
                </NavLink>
              </li>
              {/* <!-- Menu Item Borrowing Management --> */}

              {/* <!-- Menu Item Book Management --> */}
              <li>
                <NavLink
                  to="/admin/book-management"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-white duration-300 ease-in-out hover:bg-primary-dark dark:hover:bg-meta-4 ${
                    pathname.includes('book-management') &&
                    'bg-primary-dark dark:bg-meta-4'
                  }`}
                >
                  <img src={iconBook} alt="Book" />
                  Books
                </NavLink>
              </li>
              {/* <!-- Menu Item Book Management --> */}

              {/* <!-- Menu Item Book Detail Management --> */}
              <li>
                <NavLink
                  to="/admin/book-detail-management"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-white duration-300 ease-in-out hover:bg-primary-dark dark:hover:bg-meta-4 ${
                    pathname.includes('book-detail-management') &&
                    'bg-primary-dark dark:bg-meta-4'
                  }`}
                >
                  <img src={iconBookDetail} alt="Book Detail" />
                  Books Detail
                </NavLink>
              </li>
              {/* <!-- Menu Item Book Detail Management --> */}

              {/* <!-- Menu Item Stock Management --> */}
              <li>
                <NavLink
                  to="/admin/stock-management"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-white duration-300 ease-in-out hover:bg-primary-dark dark:hover:bg-meta-4 ${
                    pathname.includes('stock-management') &&
                    'bg-primary-dark dark:bg-meta-4'
                  }`}
                >
                  <img src={iconStock} alt="Stock" />
                  Stocks
                </NavLink>
              </li>
              {/* <!-- Menu Item Stock Management --> */}

              {/* <!-- Menu Item Category Management --> */}
              <li>
                <NavLink
                  to="/admin/category-management"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-white duration-300 ease-in-out hover:bg-primary-dark dark:hover:bg-meta-4 ${
                    pathname.includes('category-management') &&
                    'bg-primary-dark dark:bg-meta-4'
                  }`}
                >
                  <img src={iconCategory} alt="Category" />
                  Categories
                </NavLink>
              </li>
              {/* <!-- Menu Item Category Management --> */}

              {/* <!-- Menu Item Author Management --> */}
              <li>
                <NavLink
                  to="/admin/author-management"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-white duration-300 ease-in-out hover:bg-primary-dark dark:hover:bg-meta-4 ${
                    pathname.includes('author-management') &&
                    'bg-primary-dark dark:bg-meta-4'
                  }`}
                >
                  <img src={iconAuthor} alt="Author" />
                  Authors
                </NavLink>
              </li>
              {/* <!-- Menu Item Author Management --> */}

              {/* <!-- Menu Item Publisher Management --> */}
              <li>
                <NavLink
                  to="/admin/publisher-management"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-white duration-300 ease-in-out hover:bg-primary-dark dark:hover:bg-meta-4 ${
                    pathname.includes('publisher-management') &&
                    'bg-primary-dark dark:bg-meta-4'
                  }`}
                >
                  <img src={iconPublisher} alt="Publisher" />
                  Publishers
                </NavLink>
              </li>
              {/* <!-- Menu Item Publisher Management --> */}

              {/* <!-- Menu Item Shelf Management --> */}
              <li>
                <NavLink
                  to="/admin/shelf-management"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-white duration-300 ease-in-out hover:bg-primary-dark dark:hover:bg-meta-4 ${
                    pathname.includes('shelf-management') &&
                    'bg-primary-dark dark:bg-meta-4'
                  }`}
                >
                  <img src={iconShelf} alt="Shelf" />
                  Shelves
                </NavLink>
              </li>
              {/* <!-- Menu Item Shelf Management --> */}

              {/* <!-- Menu Item Shelf Management --> */}
              <li>
                <NavLink
                  to="/admin/member-management"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-white duration-300 ease-in-out hover:bg-primary-dark dark:hover:bg-meta-4 ${
                    pathname.includes('member-management') &&
                    'bg-primary-dark dark:bg-meta-4'
                  }`}
                >
                  <img src={iconMember} alt="Member" />
                  Members
                </NavLink>
              </li>
              {/* <!-- Menu Item Shelf Management --> */}

              {/* <!-- Menu Item Admin Management --> */}
              <li>
                <NavLink
                  to="/admin/admin-management"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-white duration-300 ease-in-out hover:bg-primary-dark dark:hover:bg-meta-4 ${
                    pathname.includes('admin-management') &&
                    'bg-primary-dark dark:bg-meta-4'
                  }`}
                >
                  <img src={iconAdmin} alt="Admin" />
                  Admins
                </NavLink>
              </li>
              {/* <!-- Menu Item Admin Management --> */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
