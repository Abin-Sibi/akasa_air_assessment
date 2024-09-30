import React, { useState, useEffect } from 'react';
import axios from '../../../config/axiosConfig'; // Ensure axios is properly configured
import './OrderList.css'; // Import your CSS file for styles

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/orders');
      setOrders(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`/orders/${orderId}`, { status: newStatus });
      fetchOrders(); // Refresh the orders list after update
      alert('Order status updated successfully!');
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Orders List</h2>
      <div className="admin-order-list">
        {orders.map((order) => (
          <div className="admin-order-card" key={order._id}>
            <div className="admin-order-header">
              <h3>User: {order.userId.name}</h3>
              <span className="admin-order-status">{order.status}</span>
            </div>
            <div className="admin-order-items">
            <p>{order._id}</p>
            <p>{order.deliveryAddress}</p>
              {order.items.map((item, index) => (
                <div className="admin-order-item" key={index}>
                    
                  {item.productId.foodName} - {item.quantity} x ${item.price}
                </div>
              ))}
            </div>
            <div className="admin-order-total">Total: ${order.total}</div>
            {order.status ==='pending' ? <button onClick={() => updateOrderStatus(order._id, 'delivered')}>Mark as Delivered</button>:'' }
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
