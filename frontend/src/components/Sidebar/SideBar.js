import React from 'react';
import './SideBar.css';
import { Link, useNavigate } from 'react-router-dom';  // Import Link and useNavigate for routing

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleLogout = () => {
        // Remove token and user details from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // Navigate to the login page
        navigate('/'); // Update the route to your actual login page path
    };

    return (
        <div className={isCollapsed ? "sidebar collapsed" : "sidebar"}>
            <div className="user-sidebar-header">
                <div className="logo">
                    <h2>{isCollapsed ? "G" : "GoMeal"}<span>.</span></h2>
                </div>
                <div className="toggle-btn" onClick={toggleSidebar}>
                    {isCollapsed ? '>' : '<'}
                </div>
            </div>
            <div className="menu">
                <Link to="/home" className="menu-item active">
                    <i className="icon">🏠</i>
                    {!isCollapsed && <span>Home</span>}
                </Link>
                <Link to="/home/foodorder" className="menu-item">
                    <i className="icon">🍴</i>
                    {!isCollapsed && <span>Food Order</span>}
                </Link>
                <Link to="/home/orderhistory" className="menu-item">
                    <i className="icon">📜</i>
                    {!isCollapsed && <span>Order History</span>}
                </Link>
            </div>
            <div className={isCollapsed ? "logout-card" : "upgrade-card"}>
                {isCollapsed ? (
                    <i className="icon logout-icon" onClick={handleLogout}>🔒</i>
                ) : (
                    <button className="upgrade-btn" onClick={handleLogout}>Logout</button>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
