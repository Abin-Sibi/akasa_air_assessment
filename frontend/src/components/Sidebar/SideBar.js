import React from 'react';
import './SideBar.css';
import { Link } from 'react-router-dom';  // Import Link for routing

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
    return (
        <div className={isCollapsed ? "sidebar collapsed" : "sidebar"}>
            <div className="sidebar-header">
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
                <Link to="#" className="menu-item">
                    <i className="icon">📜</i>
                    {!isCollapsed && <span>Order History</span>}
                </Link>
            </div>
            <div className={isCollapsed ? "logout-card" : "upgrade-card"}>
                {isCollapsed ? (
                    <i className="icon logout-icon">🔒</i>
                ) : (
                    <>
                        <p>Upgrade your Account to Get Free Voucher</p>
                        <button className="upgrade-btn">Upgrade</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
