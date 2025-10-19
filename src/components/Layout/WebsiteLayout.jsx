import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../Home/nav.jsx';

const WebsiteLayout = () => {
  return (
    <div className='pt-[80px]'>
      {/* 🔹 Navigation Bar */}
      <Nav />
      
      {/* 🔹 Page Content */}
      <Outlet />
    </div>
  );
};

export default WebsiteLayout;
