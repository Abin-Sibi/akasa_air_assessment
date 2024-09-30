import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'; // Import Routes and Route
import './Main.css';
import SideBar from '../components/Admin/AdminSideBar/SideBar';
import Dashboard from '../components/Admin/DashBoard/Dashboard';
import Category from '../components/Admin/CategoryManagement/Category';
import OrderHistory from '../components/OrderHistory/OrderHistory';
import OrderList from '../components/Admin/OrderList/OrderList';

function AdminMain() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    useEffect(() => {
        const admintoken = localStorage.getItem('admintoken');
        if (!admintoken) {
          navigate('/admin'); // Redirect to home if token exists
        }
      }, []); // Empty dependencies array

    return (
        <div className="layout">
            <SideBar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
            <div className={`content ${isCollapsed ? 'admin-content-collapsed' : 'admin-not-collapsed'}`}>
                <Routes> {/* Use Routes here for nested routing */}
                    <Route path="/" element={<Dashboard />} /> {/* Default home page */}
                    <Route path="category" element={<Category />} /> {/* Default home page */}
                    <Route path="orderlist" element={<OrderList />} /> {/* Default home page */}
                </Routes>
            </div>
        </div>
    );
}

export default AdminMain;
