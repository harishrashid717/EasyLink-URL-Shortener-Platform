import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
const Layout = () => {
  return (
    <div>
        <Navbar></Navbar>
        <br/>
        <Outlet></Outlet>
        <br />
        <Footer/>
    </div>
  )
}

export default Layout
