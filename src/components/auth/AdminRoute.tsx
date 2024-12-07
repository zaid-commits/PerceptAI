import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

const AdminRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const isAdmin = user.primaryEmailAddress?.emailAddress === 'rakhangezaid10@gmail.com';

  return isAdmin ? element : <Navigate to="/" replace />;
};

export default AdminRoute;