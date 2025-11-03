import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { apiRequest } from '../../utils/baseApi';
import { library } from '../../components/library/Library';
import Loader from '../../components/additionals/Loader';

const Preview = () => {
      const {id} = useParams();
      const navigate = useNavigate();
      const [project,setProject]=useState(null);
      const [isLoading,setIsLoading]=useState(true);

      const getProject =async()=>{
        try {
          const {data} = await apiRequest('GET',`/template/project/${id}`);
          setProject(data || null);
        } catch (error) {
          toast.error(error?.response?.data?.message || "Project not found");
          navigate('/404')
        }finally{
           setIsLoading(false);
        }
      }

      useEffect(()=>{
        getProject();
      },[id]);

  if(isLoading) {
    return <Loader />
  };

  return (
    <div className='max-w-[1800px] mx-auto'>
        { project?.components.map((c)=> {
           const Com = library.find((com)=> com.id === c.componentId);
            return Com && <Com.component key={Com.id} />
        })}
    </div>
  )
}

export default Preview;
