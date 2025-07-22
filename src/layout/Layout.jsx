import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../pages/NavBar';
import Footer from '../pages/Footer';

const Layout = () => {
  return (
    <>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </>
  )
}
export default Layout;