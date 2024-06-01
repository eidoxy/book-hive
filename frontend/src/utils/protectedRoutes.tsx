import { FC, ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

interface ProtectedRoutesProps {
  children?: ReactNode;
}

const ProtectedRoutes: FC<ProtectedRoutesProps> = ({ children }) => {
  const token = Cookies.get('token');
  console.log('Token:', token); // Debugging line

  if (token !== undefined) {
    return children ? <>{children}</> : <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoutes;
