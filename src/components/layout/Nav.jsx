import React, { useContext } from 'react'
import {NavLink, useNavigate } from 'react-router'
import { apiRequiest } from '../../utils/baseApi'
import { toast } from 'react-toastify'
import { Context } from '../../controllers/context/AuthContext'

const Nav = () => {
  const {setIsLoading,setUser} =useContext(Context);
  const navigate = useNavigate();
  const navItems = [
    {
      name : "Home", path : "/"
  },
    {
      name : "Dashboard", path : "/dashboard"
  }
]

const handleLogout =async()=>{
  setIsLoading(true);
  try {

                    await apiRequiest('GET','/auth/logout');
                    setUser(null);
                    toast.success("User logout successfully");
                    navigate('/login');
                    } catch (error) {
                      toast.error(error?.response?.data?.message);
                    }finally{
                      setIsLoading(false);
                    }
}
  return (
    <div className='sticky top-0 z-50 bg-white flex justify-between items-center px-5'>
      <h1 className='text-3xl text-center py-2 font-bold'>Builder<span className='text-yellow-500'>X</span></h1>
      <div className='space-x-5 text-lg font-medium'>
        {navItems.map((item)=>(
          <NavLink to={item.path}
            className={({isActive})=>(`${isActive && "border-b-2 border-yellow-500"}`)}
           key={item.path}>{item.name}</NavLink> 
        ))}
        <button className='bg-yellow-500 px-3.5 py-1 rounded-lg cursor-pointer'
        onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default Nav
