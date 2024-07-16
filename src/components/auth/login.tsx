import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from 'resources/routes-constants';
import { useAppSelector } from 'store';

const PrivateLoginRoute = () => {
	const token = useAppSelector(state => state.token.token);


  if (token) {
    return <Navigate to={ROUTES.PRINCIPAL_PAGE_ROUTE} />;
  }

  return <Outlet />;
};

export default PrivateLoginRoute;
