import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import UseAuth from '../Custom/cutomAuth/UseAuth';
import useAdmin from '../Custom/useAdmin/useAdmin';

const AdminRoute = ({children}) => {
    const [isAdmin, isAdminLoading] = useAdmin()
    const { user, loading } = UseAuth()
    const location = useLocation()
    if (loading || isAdminLoading) {
      return (
        <div className="flex flex-col gap-4 w-52">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      );
    }
    if (user && isAdmin) {
      return children;
    }

    return <Navigate state={{ from: location }} to="/login" replace></Navigate>;
};

export default AdminRoute;