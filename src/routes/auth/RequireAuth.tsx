import React from 'react';
import {Navigate, useLocation} from 'react-router-dom'
import useAuth from './UseAuth';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
    let auth = useAuth();
    let location = useLocation();
    if (auth.isAuthenticated) {
        return children;
    }
    return <Navigate to="/" state={{ from: location }} replace />;
};

export default RequireAuth;
