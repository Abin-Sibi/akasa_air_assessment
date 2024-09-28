import React from 'react';
import './CartSideBar.css';

const CartSidebar = ({ isOpen, toggleCart }) => {
  return (
    <>
      {/* Sidebar */}
      <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="close-btn" onClick={toggleCart}>
            &times;
          </button>
        </div>

        <div className="address-section">
          <p><strong>Your Address</strong></p>
          <p>Elm Street, 23 <button className="change-btn">Change</button></p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <button className="address-btn">Add Details</button>
          <button className="address-btn">Add Note</button>
        </div>

        <div className="order-menu">
          <h3>Order Menu</h3>
          <div className="order-item">
            <img src="/pepperoni.png" alt="Pepperoni Pizza" />
            <p>Pepperoni Pizza x1</p>
            <p>+$5.59</p>
          </div>
          <div className="order-item">
            <img src="/cheeseburger.png" alt="Cheese Burger" />
            <p>Cheese Burger x1</p>
            <p>+$5.59</p>
          </div>
          <div className="order-item">
            <img src="/veganpizza.png" alt="Vegan Pizza" />
            <p>Vegan Pizza x1</p>
            <p>+$5.59</p>
          </div>
          
        </div>

        <div className="order-summary">
          <p>Service: +$1.00</p>
          <p>Total: $202.00</p>
          <button className="checkout-btn">Checkout</button>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && <div className="overlay" onClick={toggleCart}></div>}
    </>
  );
};

export default CartSidebar;
