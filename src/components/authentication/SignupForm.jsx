import React, { useState } from 'react'
import { apiRequest } from '../../utils/baseApi';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router';

const SignupForm = () => {
  const navigate = useNavigate();
    const initValues = {
        name : "",
        email : "",
        password : ""
    }
    const [userData,setUserData]=useState(initValues);
    const handleChange =(e)=>{
        const {name,value} = e.target;
        setUserData((prev)=>({...prev,[name] : value}))
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
         try {
                  await apiRequest('POST','/user/signup',userData);
                   toast.success("User created successfully");
                   navigate('/login');
                  } catch (error) {
                    toast.error(error?.response?.data?.message);
                  }
    }
    
  return (
    <form onSubmit={handleSubmit} className='border border-gray-300 w-[400px]
    rounded-2xl p-5 space-y-2'>
        <h1 className='text-3xl text-center mb-6'>Signup  <span className='font-bold'>Builder</span><span className='font-bold text-yellow-500'>X</span></h1>
        <label htmlFor="name">
  <span className="text-sm font-medium text-gray-700"> Name </span>

  <input onChange={handleChange} type="name" id="name" name='name' 
  className="mt-0.5 w-full rounded border-gray-300 
  shadow-sm sm:text-sm py-2 px-3 text-xl outline-yellow-500"/>
</label>
        <label htmlFor="Email">
  <span className="text-sm font-medium text-gray-700"> Email </span>

  <input onChange={handleChange} type="email" name='email' id="Email" className="mt-0.5 w-full rounded border-gray-300 
  shadow-sm sm:text-sm py-2 px-3 text-xl outline-yellow-500"/>
</label>
        <label htmlFor="password">
  <span className="text-sm font-medium text-gray-700"> Password </span>

  <input onChange={handleChange} type="password" name='password' id="password" className="mt-0.5 w-full rounded border-gray-300 
  shadow-sm sm:text-sm py-2 px-3 text-xl outline-yellow-500"/>
</label>
    <button type='submit' className='bg-yellow-500 cursor-pointer rounded-xl px-5 
    py-2 w-full mt-3'>Sign up</button>
    <span>Already have an Account <Link to={'/login'}
      className='text-yellow-500 font-semibold'>Login</Link> </span>
    </form>
  )
}

export default SignupForm
