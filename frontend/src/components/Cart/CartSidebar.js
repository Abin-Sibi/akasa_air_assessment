import React, { useEffect, useState } from 'react';
import './CartSideBar.css';
import axios from '../../config/axiosConfig';
import { useCart } from '../../cartContext';


const CartSidebar = ({ isOpen, toggleCart }) => {
  const [cartItems, setCartItems] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const { addToCart } = useCart();

  // Fetch cart items when the sidebar opens
  useEffect(() => {
      axios.get(`/cart/${user._id}`).then((response) => {
        setCartItems(response.data.cart); // Store the cart data in the state
        addToCart(response.data.cart.length);
      }).catch((error) => {
        console.error('Error fetching cart data:', error);
      });
  }, [isOpen]);

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
        </div>

        {/* Order Menu - Dynamically rendering the cart items */}
        <div className="order-menu">
          <h3>Order Menu</h3>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.productId} className="order-item">
                {/* Assuming you fetch product details including the image */}
                <img src={item.image} alt="Product" />
                <p>{item.foodName} x{item.quantity}</p>
                <p>+${item.updatedPrice}</p>
              </div>
            ))
          ) : (
            <p>Your cart is empty</p>
          )}
        </div>

        <div className="order-summary">
          {/* Calculating total price */}
          <p>Service: +$1.00</p>
          <p>Total: ${cartItems.reduce((total, item) => total + item.updatedPrice * item.quantity, 1)}</p>
          <button className="checkout-btn">Checkout</button>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && <div className="overlay" onClick={toggleCart}></div>}
    </>
  );
};

export default CartSidebar;
