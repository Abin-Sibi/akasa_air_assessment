import React, { useState } from 'react';
import { FaBars, FaHome, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import './AdminSide.css';
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate(); // Hook for navigation

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Clear the authentication token (or user data)
    localStorage.removeItem('token'); // Remove token or user-related info from storage
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className={isOpen ? 'adminsidebar open' : 'adminsidebar'}>
      <div className="sidebar-header">
        <FaBars onClick={toggleSidebar} className="toggle-btn" />
        {isOpen && <h3>Admin Panel</h3>}
      </div>
      <ul className="sidebar-menu">
        <li onClick={() => navigate('/dashboard')}><FaHome />{isOpen && <span>Dashboard</span>}</li>
        <li onClick={() => navigate('/category')}><FaCog />{isOpen && <span>Category</span>}</li>
        <li onClick={() => navigate('/users')}><FaUser />{isOpen && <span>Users</span>}</li>
      
        <li onClick={handleLogout}><FaSignOutAlt />{isOpen && <span>Logout</span>}</li>
      </ul>
    </div>
  );
};

export default SideBar;
