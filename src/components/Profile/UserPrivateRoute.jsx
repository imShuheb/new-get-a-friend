import React from 'react';
import { Navigate } from 'react-router-dom';

const UserPrivateRoute = ({ element, user }) => {
    return user ? element : <Navigate to="/login" />;
};

export default UserPrivateRoute;
