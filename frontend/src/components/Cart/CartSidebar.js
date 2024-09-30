import React, { useEffect, useState } from 'react';
import './CartSideBar.css';
import axios from '../../config/axiosConfig';
import { useCart } from '../../cartContext';

const CartSidebar = ({ isOpen, toggleCart }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCheckoutOpen, setCheckoutOpen] = useState(false); 
  const [paymentMethod, setPaymentMethod] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const { addToCart } = useCart();

  useEffect(() => {
      axios
        .get(`/cart/${user._id}`)
        .then((response) => {
          setCartItems(response.data.cart);
          addToCart(response.data.cart.length);
        })
        .catch((error) => {
          console.error('Error fetching cart data:', error);
        });
  }, [isOpen]);

  const toggleCheckoutModal = () => {
    setCheckoutOpen(!isCheckoutOpen);
  };

  const handleRemoveItem = (productId) => {
    setCartItems(cartItems.filter(item => item.productId !== productId));
    axios.delete('/cart/remove', { 
        data: { userId: user._id, productId } // Send the data in the 'data' property
      })
      .then(() => {
        console.log('Item removed successfully');
      })
      .catch((error) => {
        console.error('Error removing item:', error);
      });
  };

  const handleIncreaseQuantity = (productId) => {
    setCartItems(
      cartItems.map((item) =>
        item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
    axios.put('/cart/update-quantity',{userId:user._id,productId,quantityChange:1})
      .then(() => {
        console.log('Quantity increased');
      })
      .catch((error) => {
        console.error('Error increasing quantity:', error);
      });
  };

  const handleDecreaseQuantity = (productId) => {
    const item = cartItems.find(item => item.productId === productId);
    if (item.quantity > 1) {
      setCartItems(
        cartItems.map((item) =>
          item.productId === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
      axios.put('/cart/update-quantity',{userId:user._id,productId,quantityChange:-1})
        .then(() => {
          console.log('Quantity decreased');
        })
        .catch((error) => {
          console.error('Error decreasing quantity:', error);
        });
    }
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handlePlaceOrder = () => {
    if (!paymentMethod) {
      alert('Please select a payment method!');
      return;
    }

    const orderData = {
      userId: user._id,
      paymentMethod,
    };

    axios
      .post('/cart/checkout', orderData)
      .then((response) => {
        alert('Order placed successfully!');
        setCheckoutOpen(false);
        toggleCart();
      })
      .catch((error) => {
        console.error('Error placing order:', error);
        alert('Failed to place order. Please try again.');
      });
  };

  return (
    <>
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

        <div className="order-menu">
          <h3>Order Menu</h3>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.productId} className="order-item">
                <img src={item.image} alt="Product" />
                <p>{item.foodName}</p>
                <div className="quantity-controls">
                  <button onClick={() => handleDecreaseQuantity(item.productId)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncreaseQuantity(item.productId)}>+</button>
                </div>
                <p>${item.updatedPrice * item.quantity}</p>
                <button className="remove-btn" onClick={() => handleRemoveItem(item.productId)}>Remove</button>
              </div>
            ))
          ) : (
            <p>Your cart is empty</p>
          )}
        </div>

        <div className="order-summary">
          <p>Service: +$1.00</p>
          <p>Total: ${cartItems.reduce((total, item) => total + item.updatedPrice * item.quantity, 1)}</p>
          <button className="checkout-btn" onClick={toggleCheckoutModal}>Checkout</button>
        </div>
      </div>

      {isOpen && <div className="overlay" onClick={toggleCart}></div>}

      {isCheckoutOpen && (
        <div className="custom-modal">
          <div className="modal-content">
            <h2>Checkout Details</h2>

            <div className="checkout-items">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div key={item.productId} className={`checkout-item ${item.stock === 0 ? 'out-of-stock' : ''}`}>
                    <img src={item.image} alt="Product" />
                    <div className="checkout-details">
                      <p>{item.foodName} x{item.quantity}</p>
                      <p>${item.updatedPrice * item.quantity}</p>
                      {item.stock === 0 && (
                        <p className="out-of-stock-text">Out of Stock</p>
                      )}
                      <button className="remove-btn" onClick={() => handleRemoveItem(item.productId)}>
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>Your cart is empty</p>
              )}
            </div>

            <div className="payment-method">
              <h3>Select Payment Method</h3>
              <select value={paymentMethod} onChange={handlePaymentChange}>
                <option value="">Select</option>
                <option value="credit-card">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="cash">Cash on Delivery</option>
              </select>
            </div>

            <button className="order-btn" onClick={handlePlaceOrder}>Place Order</button>
            <button className="close-modal-btn" onClick={toggleCheckoutModal}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default CartSidebar;
