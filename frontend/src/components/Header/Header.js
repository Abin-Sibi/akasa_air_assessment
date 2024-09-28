// Header.js
import React, { useState } from 'react';
import './Header.css'; // Import the CSS file for styles
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa'; // You can use any icon library
import CartSidebar from '../Cart/CartSidebar';

const Header = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    const toggleCart = () => {
      setIsCartOpen(!isCartOpen);
    };
    return (
        <>
        <header className="header">
            <div className="header-content">
            <FaShoppingCart className="icon" onClick={toggleCart} />
                <span className="welcome-message">Welcome, Abin</span>
                <FaUserCircle className="icon" />
               
            </div>
        </header>
        <CartSidebar isOpen={isCartOpen} toggleCart={toggleCart} />
        </>
        
    );
};

export default Header;
