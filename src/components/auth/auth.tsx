import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from 'store';

const PrivateRoute = () => {
	const token = useAppSelector(state => state.token.token);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
