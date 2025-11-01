import React from 'react'
import Nav from './Nav'
import { Outlet } from 'react-router'

const CommonLayout = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  )
}

export default CommonLayout
