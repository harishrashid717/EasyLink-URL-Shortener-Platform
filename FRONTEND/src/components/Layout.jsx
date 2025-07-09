import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
const Layout = () => {
  return (
    <>
        <Navbar></Navbar>
        <br/>
        <Outlet></Outlet>
    </>
  )
}

export default Layout
