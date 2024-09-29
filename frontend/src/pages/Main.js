import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route
import Sidebar from '../components/Sidebar/SideBar';
import Home from '../components/Home/Home';
import './Main.css';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import FoodOrder from '../components/FoodOrder/FoodOrder';

function Main() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="layout">
            <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
            <div className={`content ${isCollapsed ? 'content-collapsed' : 'not-collapsed'}`}>
                <Header/>
                <Routes> {/* Use Routes here for nested routing */}
                    <Route path="/" element={<Home />} /> {/* Default home page */}
                    <Route path="foodorder" element={<FoodOrder />} /> {/* Food Order page */}
                </Routes>
                <Footer/>
            </div>
        </div>
    );
}

export default Main;
