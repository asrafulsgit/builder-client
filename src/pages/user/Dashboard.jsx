import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../controllers/context/AuthContext'
import { apiRequiest } from '../../utils/baseApi';
import { toast } from 'react-toastify';
import { Link } from 'react-router';

const Dashboard = () => {
  const {user} = useContext(Context);
  const [projects,setProjects]=useState([]);
  const getMyProjects =async()=>{
    try {
      const {data} = await apiRequiest('GET','/template/my-projects');
      setProjects(data.templates || []);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  useEffect(()=>{
    getMyProjects();
  },[]);

  return (
    <div className='px-10 py-5'>
        <h1 className='font-bold text-4xl text-center'>Hello <span className='text-yellow-500'>{user?.name}</span></h1>
        
        <div className='mt-10'>
          <h2 className='font-bold text-xl'>My projects</h2>
          <div className='mt-3 flex gap-5'>
             {projects.map((project)=>(
              <div className='border border-neutral-300 rounded-xl 
              p-3 flex flex-col gap-2' key={project?._id}>
                <h3 className='text-lg font-bold'>{project?.name}</h3>
                <Link to={`/project/${project?._id}`}><button className='bg-yellow-500 
                px-3 py-1 rounded-lg cursor-pointer'>
                  See 
                </button></Link>
              </div>
             )) }
          </div>
        </div>
    </div>
  )
}

export default Dashboard
