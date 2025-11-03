import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { apiRequiest } from '../../utils/baseApi';
import { library } from '../../components/library/Library';

const Preview = () => {
      const {id} = useParams();
      const navigate = useNavigate();
      const [project,setProject]=useState(null);
      const [isLoading,setIsLoading]=useState(true);

      const getProject =async()=>{
        try {
          const {data} = await apiRequiest('GET',`/template/project/${id}`);
          setProject(data || null);
        } catch (error) {
          toast.error(error?.response?.data?.message);
          navigate('/404')
        }finally{
           setIsLoading(false);
        }
      }

      useEffect(()=>{
        getProject();
      },[]);

  if(isLoading) return;

  return (
    <div className='max-w-[1800px] mx-auto'>
        { project?.components.map((c)=> {
           const Com = library.find((com)=> com.id === c.componentId);
            return <Com.component />
        })}
    </div>
  )
}

export default Preview;
