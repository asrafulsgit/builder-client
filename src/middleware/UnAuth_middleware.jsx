import React, { useContext } from 'react'
import { Navigate } from 'react-router';
import { Context } from '../controllers/context/AuthContext';

const UnAuth_middleware = ({children}) => {
    const {user,isLoading} = useContext(Context);
    return (!isLoading && (user ? <Navigate to={'/'}/> : children ));
}

export default UnAuth_middleware
