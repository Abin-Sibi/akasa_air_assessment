import React, { useEffect, useState, useCallback } from 'react';
import './CartSideBar.css';
import axios from '../../config/axiosConfig';
import { useCart } from '../../cartContext';
import { FaEdit, FaTrash } from 'react-icons/fa';

const CartSidebar = ({ isOpen, toggleCart }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);
  const [isAddressModalOpen, setAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [newAddress, setNewAddress] = useState({
    street: '',
    city: '',
    zip: ''
  });
  const [addresses, setAddresses] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const { addToCart } = useCart();
  const [selectedAddress, setSelectedAddress] = useState(''); 

  // Fetch addresses and cart data only when sidebar is open
  useEffect(() => {
      fetchAddresses();
      fetchCartItems();
      console.log(addresses,'helll')
  }, [isOpen]);

  // Fetch addresses
  const fetchAddresses = useCallback(() => {
    axios.get(`/${user._id}/addresses`)
      .then(response => setAddresses(response.data))
      
      .catch(error => console.error('Error fetching addresses:', error));
  }, [user._id]);

  // Fetch cart items
  const fetchCartItems = useCallback(() => {
    axios.get(`/cart/${user._id}`)
      .then(response => {
        setCartItems(response.data.cart);
        addToCart(response.data.cart.length);
      })
      .catch(error => console.error('Error fetching cart data:', error));
  }, [user._id, addToCart]);

  // Handle address form changes
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress(prev => ({ ...prev, [name]: value }));
  };

  // Handle adding or editing address
  const handleSaveAddress = () => {
    const apiCall = editingAddress
      ? axios.put(`/${user._id}/address/${editingAddress._id}`, newAddress)
      : axios.post(`/${user._id}/address`, newAddress);

    apiCall
      .then(response => {
        setAddresses(response.data.addresses);
        setNewAddress({});
        toggleAddressModal();
      })
      .catch(error => console.error('Error saving address:', error));
  };

  // Remove cart item
  const handleRemoveItem = (productId) => {
    setCartItems(prev => prev.filter(item => item.productId !== productId));
    axios.delete('/cart/remove', { data: { userId: user._id, productId } })
      .then(() => console.log('Item removed successfully'))
      .catch(error => console.error('Error removing item:', error));
  };

  // Change item quantity
  const changeItemQuantity = (productId, quantityChange) => {
    const item = cartItems.find(item => item.productId === productId);
    if (item && (quantityChange > 0 || item.quantity > 1)) {
      setCartItems(prev => prev.map(item =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + quantityChange }
          : item
      ));
      axios.put('/cart/update-quantity', { userId: user._id, productId, quantityChange })
        .then(() => console.log('Quantity updated'))
        .catch(error => console.error('Error updating quantity:', error));
    }
  };

  // Toggle modals
  const toggleCheckoutModal = () => {
    
    setCheckoutOpen(prev => !prev)};
  const toggleAddressModal = () => {
    setAddressModalOpen(prev => !prev);
    if (isAddressModalOpen) {
      setEditingAddress(null);
      setNewAddress({});
    }
  };

  const toggleEditAddressModal = (address) => {
    setEditingAddress(address);
    setNewAddress({
      street: address.street,
      city: address.city,
      zip: address.zip,
    });
    toggleAddressModal();
  };

  // Handle delete address
  const handleDeleteAddress = (addressId) => {
    axios.delete(`/${user._id}/address/${addressId}`)
      .then(response => {
        setAddresses(response.data.addresses);
        setNewAddress({});
        console.log('Address deleted successfully');
      })
      .catch(error => console.error('Error deleting address:', error));
  };

  // Handle payment method change
  const handlePaymentChange = (e) => setPaymentMethod(e.target.value);
  const handleAddAddress = (e) => {
    setSelectedAddress(e.target.value);
  };

  // Place order
  const handlePlaceOrder = () => {
    if (!paymentMethod) {
      alert('Please select a payment method!');
      return;
    }

    const orderData = { userId: user._id, paymentMethod,selectedAddress };

    axios.post('/cart/checkout', orderData)
      .then(() => {
        alert('Order placed successfully!');
        setCheckoutOpen(false);
        toggleCart();
      })
      .catch(error => {
        console.error('Error placing order:', error);
        alert('Failed to place order. Please try again.');
      });
  };

  return (
    <>
      <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="close-btn1" onClick={toggleCart}>&times;</button>
        </div>

        {/* Address Section */}
        <div className="address-section">
  <h3>Addresses</h3>
  <div className="address-list">
    {addresses.map((address) => (
      <div key={address._id} className="address-card">
        <div className="address-details">
          <p>{address.street}, {address.city} - {address.zip}</p>
        </div>
        <div className="address-actions">
          <button className="edit-btn" onClick={() => toggleEditAddressModal(address)}>
            <FaEdit />
          </button>
          <button className="delete-btn" onClick={() => handleDeleteAddress(address._id)}>
            <FaTrash />
          </button>
        </div>
      </div>
    ))}
  </div>
  <button className="add-address-btn" onClick={toggleAddressModal}>
    Add New Address
  </button>
</div>


        {/* Cart Items */}
        <div className="order-menu">
  <h3>Order Menu</h3>
  {cartItems.length > 0 ? (
    cartItems.map((item) => (
      <div key={item.productId} className="order-card">
        <img src={item.image} alt="Product" className="order-item-image" />
        <div className="order-item-details">
          <p className="food-name">{item.foodName}</p>
          <div className="quantity-controls">
            <button onClick={() => changeItemQuantity(item.productId, -1)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => changeItemQuantity(item.productId, 1)}>+</button>
          </div>
        </div>
         <div className="price-remove">
          <p>${item.updatedPrice * item.quantity}</p>
          <button className="remove-btn" onClick={() => handleRemoveItem(item.productId)}>
            <FaTrash />
          </button>
        </div>
      </div>
    ))
  ) : (
    <p>Your cart is empty</p>
  )}
</div>


        {/* Order Summary */}
        <div className="order-summary">
          <p>Service: +$1.00</p>
          <p>Total: ${cartItems.reduce((total, item) => total + item.updatedPrice * item.quantity, 1)}</p>
          <button className="checkout-btn" onClick={toggleCheckoutModal}>Checkout</button>
        </div>
      </div>

      {/* Modals */}
      {isOpen && <div className="overlay" onClick={toggleCart}></div>}
      {isAddressModalOpen && (
        <Modal
          title={editingAddress ? "Edit Address" : "Add Address"}
          onClose={toggleAddressModal}
          onSave={handleSaveAddress}
        >
          <AddressForm
            address={newAddress}
            onChange={handleAddressChange}
          />
        </Modal>
      )}

      {isCheckoutOpen && (
        <Modal
          title="Checkout Details"
          onClose={toggleCheckoutModal}
          onSave={handlePlaceOrder}
          isCheckoutOpen = {isCheckoutOpen}
          
        >
          <Checkout cartItems={cartItems} paymentMethod={paymentMethod} selectedAddress={selectedAddress}  addresses = {addresses} onAddressChange={handleAddAddress} onPaymentChange={handlePaymentChange} />
        </Modal>
      )}
    </>
  );
};

// Reusable Modal component
const Modal = ({ title, children, onClose, onSave, isCheckoutOpen }) => (
  <div className="custom-modal">
    <div className="modal-content">
      <h2>{title}</h2>
      {children}
      <div className="modal-actions">
        {isCheckoutOpen ?<button className="save-btn" onClick={onSave}>Proceed Payment</button>:<button className="save-btn" onClick={onSave}>Save</button>}
        <button className="close-modal-btn" onClick={onClose}>Cancel</button>
      </div>
    </div>
  </div>
);

// Reusable Address Form component
const AddressForm = ({ address, onChange }) => (
  <div className="address-form">
    <input type="text" name="street" placeholder="Street" value={address.street} onChange={onChange} />
    <input type="text" name="city" placeholder="City" value={address.city} onChange={onChange} />
    <input type="text" name="zip" placeholder="Zip Code" value={address.zip} onChange={onChange} />
  </div>
);

// Reusable Checkout component
// Reusable Checkout component
const Checkout = ({ cartItems, paymentMethod, onPaymentChange, selectedAddress, addresses, onAddressChange }) => (
    
    <>
      {/* Checkout Items Section */}
      <div className="checkout-items">
        {cartItems.map(item => (
          <div key={item.productId} className="checkout-item">
            <div className="item-details">
              <h4>{item.foodName}</h4>
              <p>Quantity: {item.quantity}</p>
            </div>
            <div className="item-price">
              <p>${item.updatedPrice * item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
  
      {/* Address Selection Section */}
      <div className="address-selection">
        <h3>Select Delivery Address</h3>
        <div className="select-container">
          <select value={selectedAddress} onChange={onAddressChange}>
            <option value="">Select Address</option>
            {addresses.map(address => (
              <option key={address._id} value={`${address.street}, ${address.city} - ${address.zip}`}>
                {`${address.street}, ${address.city} - ${address.zip}`}
              </option>
            ))}
          </select>
        </div>
      </div>
  
      {/* Payment Method Section */}
      <div className="payment-method">
        <h3>Select Payment Method</h3>
        <div className="select-container">
          <select value={paymentMethod} onChange={onPaymentChange}>
            <option value="">Select</option>
            <option value="Cash on Delivery">Cash on Delivery</option>
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
          </select>
        </div>
      </div>
    </>
  );
  

export default CartSidebar;
