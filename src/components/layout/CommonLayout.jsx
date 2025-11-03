import React from 'react'
import Nav from './Nav'
import { Outlet } from 'react-router'

const CommonLayout = () => {
  return (
    <div className='max-w-[1800px] mx-auto'>
      <Nav />
      <Outlet />
    </div>
  )
}

export default CommonLayout
