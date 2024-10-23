import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, isAdmin }) => {
    return isAdmin.admin ? element : <Navigate to="/" />;
};

export default PrivateRoute;
