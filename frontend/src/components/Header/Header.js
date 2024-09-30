// Header.js
import React, { useState } from 'react';
import './Header.css'; // Import the CSS file for styles
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa'; // You can use any icon library
import CartSidebar from '../Cart/CartSidebar';
import { useCart } from '../../cartContext';

const Header = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { cartCount } = useCart();
    const user = JSON.parse(localStorage.getItem('user'));

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };
    return (
        <>
            <header className="header">
                <div className="header-content">
                    <div className="cart-container">
                        <FaShoppingCart className="icon" onClick={toggleCart} />
                        {cartCount > 0 && (
                            <span className="cart-badge">{cartCount}</span>
                        )}
                    </div>
                    <span className="welcome-message">Welcome, {user.name}</span>
                    <FaUserCircle className="icon" />

                </div>
            </header>
            <CartSidebar isOpen={isCartOpen} toggleCart={toggleCart} />
        </>

    );
};

export default Header;
