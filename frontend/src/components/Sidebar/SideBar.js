import React, { useState } from 'react';
import './SideBar.css';

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
                <a href="#" className="menu-item active">
                    <i className="icon">🏠</i>
                    {!isCollapsed && <span>Home</span>}
                </a>
                <a href="#" className="menu-item">
                    <i className="icon">🍴</i>
                    {!isCollapsed && <span>Food Order</span>}
                </a>
                <a href="#" className="menu-item">
                    <i className="icon">📜</i>
                    {!isCollapsed && <span>Order History</span>}
                </a>
            </div>
            {/* Change upgrade card to logout icon when collapsed */}
            <div className={isCollapsed ? "logout-card" : "upgrade-card"}>
                {isCollapsed ? (
                    <i className="icon logout-icon">🔒</i> // Logout icon
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
