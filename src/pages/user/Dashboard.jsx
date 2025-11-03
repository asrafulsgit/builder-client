import React from 'react'

const Dashboard = () => {
  return (
    <div className='px-10 py-5'>
        <h1 className='font-bold text-4xl text-center'>Hello <span className='text-yellow-500'>Karim</span></h1>
        
        <div className='mt-10'>
          <h2 className='font-bold text-xl'>My projects</h2>
          <div className='mt-3 flex gap-5'>
              <div className='border border-neutral-300 rounded-xl 
              p-3 flex flex-col gap-2'>
                <h3 className='text-lg font-bold'>E-commerce</h3>
                <button className='bg-yellow-500 
                px-3 py-1 rounded-lg cursor-pointer'>
                  See 
                </button>
              </div>
          </div>
        </div>
    </div>
  )
}

export default Dashboard
