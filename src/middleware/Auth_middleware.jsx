import React, { useContext } from 'react'
import { Context } from '../controllers/context/AuthContext'
import { Navigate } from 'react-router';

const Auth_middleware = ({children}) => {
  const {user} = useContext(Context);
  return (user ? children : <Navigate to={'/login'}/>)
}

export default Auth_middleware
