import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'; // Import Routes and Route
import Sidebar from '../components/Sidebar/SideBar';
import Home from '../components/Home/Home';
import './Main.css';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import FoodOrder from '../components/FoodOrder/FoodOrder';
import OrderHistory from '../components/OrderHistory/OrderHistory';

function Main() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const navigate = useNavigate();


    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };
      // Redirect if the user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/'); // Redirect to home if token exists
    }
  }, [navigate]); // Empty dependencies array

    return (
        <div className="layout">
            <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
            <div className={`content ${isCollapsed ? 'content-collapsed' : 'not-collapsed'}`}>
                <Header/>
                <Routes> {/* Use Routes here for nested routing */}
                    <Route path="/" element={<Home />} /> {/* Default home page */}
                    <Route path="foodorder" element={<FoodOrder />} /> {/* Food Order page */}
                    <Route path="orderhistory" element={<OrderHistory />} /> {/* Food Order page */}
                </Routes>
                <Footer/>
            </div>
        </div>
    );
}

export default Main;
