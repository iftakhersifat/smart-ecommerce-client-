import React, { use } from 'react';
import { AuthContext } from './AuthProvider';
import { Navigate, useLocation } from 'react-router';

const Private = ({children}) => {
    const {user, loading}=use(AuthContext)
    const location = useLocation();
    console.log(location.pathname)
    if (loading) {
    return <div className="text-center mt-10 text-lg">Loading user info...</div>;
  }
    if(!user){
        return <Navigate to='/login' state={location.pathname}></Navigate>
    }
    return children;
};

export default Private;