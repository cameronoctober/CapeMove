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

  // TEMPORARY: Allow all users to access protected pages for verification/testing
  // Remove this block to restore auth protection
  return <Outlet />;
};

export default ProtectedRoute;
