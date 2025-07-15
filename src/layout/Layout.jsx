import React from 'react'
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
        <nav>Mi Nav Bar</nav>
        <Outlet/>
        <footer>Mi Footer</footer>
    </>
  )
}
export default Layout;