import { Suspense, lazy, useEffect, useState, FC, ReactNode } from 'react';
import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';

import HomePage from './pages/HomePage';
import Login from './pages/Authentication/Login';
import Register from './pages/Authentication/Register';
import AdminLogin from './pages/Authentication/Admin/Login';
import Loader from './common/Loader';
import routes from './routes';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

interface ProtectedRoutesProps {
  children?: ReactNode;
}

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const ProtectedRoutes: FC<ProtectedRoutesProps> = ({ children }) => {
    const token = Cookies.get('token');
    if (token !== undefined) {
      return children ? <>{children}</> : <Outlet />;
    } else {
      return <Navigate to="/admin/login" />;
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route index element={<HomePage />} />
        {/* End Public Routes */}

        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login user="admin" />} />
        {/* Protected Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route element={<DefaultLayout />}>
            {routes.map((routes, index) => {
              const { path, component: Component } = routes;
              return (
                <Route
                  key={index}
                  path={path}
                  element={
                    <Suspense fallback={<Loader />}>
                      <Component />
                    </Suspense>
                  }
                />
              );
            })}
          </Route>
        </Route>
        {/* End Protected Routes */}
        {/* End Admin Routes */}
      </Routes>
    </>
  );
}

export default App;
