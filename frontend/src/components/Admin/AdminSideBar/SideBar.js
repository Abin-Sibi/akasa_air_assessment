import React, { useState } from 'react';
import { FaBars, FaHome, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import './AdminSide.css';

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={isOpen ? 'adminsidebar open' : 'adminsidebar'}>
      <div className="sidebar-header">
        <FaBars onClick={toggleSidebar} className="toggle-btn" />
        {isOpen && <h3>Admin Panel</h3>}
      </div>
      <ul className="sidebar-menu">
        <li><FaHome />{isOpen && <span>Dashboard</span>}</li>
        <li><FaUser />{isOpen && <span>Users</span>}</li>
        <li><FaCog />{isOpen && <span>Settings</span>}</li>
        <li><FaSignOutAlt />{isOpen && <span>Logout</span>}</li>
      </ul>
    </div>
  );
};

export default SideBar;
