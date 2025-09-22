import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

interface Props {
  roles?: Array<'user' | 'moderator' | 'admin'>;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<Props> = ({ roles, redirectTo = '/login' }) => {
  const auth = useAppSelector((s) => s.auth);
  const location = useLocation();

  if (!auth.user || !auth.accessToken) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (roles && !roles.includes(auth.user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
