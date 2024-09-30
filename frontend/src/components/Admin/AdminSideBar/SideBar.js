import React, { useState } from 'react';
import { FaBars, FaHome, FaUser, FaCog, FaSignOutAlt,FaListAlt, FaTags } from 'react-icons/fa';
import './AdminSide.css';
import { useNavigate } from 'react-router-dom';

const SideBar = ({ isCollapsed, toggleSidebar }) => {
//   const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate(); // Hook for navigation

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

  const handleLogout = () => {
    // Clear the authentication token (or user data)
    localStorage.removeItem('admintoken'); // Remove token or user-related info from storage
    navigate('/admin'); // Redirect to login page
  };

  return (
    <div className={isCollapsed ? 'adminsidebar open' : 'adminsidebar'}>
      <div className="sidebar-header">
        <FaBars onClick={toggleSidebar} className="toggle-btn" />
        {isCollapsed && <h3>Admin Panel</h3>}
      </div>
      <ul className="sidebar-menu">
        <li onClick={() => navigate('/adminhome')}><FaHome />{isCollapsed && <span>Dashboard</span>}</li>
        <li onClick={() => navigate('/adminhome/category')}><FaTags />{isCollapsed && <span>Category</span>}</li>
        <li onClick={() => navigate('/adminhome/orderlist')}><FaListAlt />{isCollapsed && <span>Orders</span>}</li>
      
        <li onClick={handleLogout}><FaSignOutAlt />{isCollapsed && <span>Logout</span>}</li>
      </ul>
    </div>
  );
};

export default SideBar;
