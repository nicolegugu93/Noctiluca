// src/layout/LayoutBase.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

const LayoutBase = () => {
    return (
    <>
    <Outlet />
    <Footer />
    </>
    );
};

export default LayoutBase;
