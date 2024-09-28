import React, { useState } from 'react';
import Sidebar from '../components/Sidebar/SideBar';
import Home from '../components/Home/Home';
import './Main.css';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';

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
                <Home />
                <Footer/>
            </div>
        </div>
    );
}

export default Main;
