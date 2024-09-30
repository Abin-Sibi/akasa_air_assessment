import React, { useEffect, useState } from 'react';
import axios from '../../config/axiosConfig';
import './OrderHistory.css'; // CSS to match the design

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        axios.get(`/cart/order-history/${user._id}`)
            .then(response => {
                console.log(response, 'Fetched orders successfully');
                setOrders(response.data.orders);
            })
            .catch(error => {
                console.error('Error fetching order history:', error);
            });
    }, [user._id]);

    return (
        <div className="order-history">
            <h2 className="order-history-heading">Your Order History</h2> {/* Added heading */}
            {orders.length > 0 ? (
                orders.map(order => (
                    <div className="order-card" key={order._id}>
                        <div className={`badge ${order.status === 'delivered' ? 'delivered' : 'not-delivered'}`}>
                            {order.status === 'delivered' ? 'Delivered' : 'Not Delivered'}
                        </div>
                        <h3>Order ID: {order._id}</h3>
                        <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                        <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>

                        <div className="order-items">
                            <h4>Items:</h4>
                            {order.items.map(item => (
                                <div className="order-item" key={item._id}>
                                    <p>{item.productId.foodName ? item.productId.foodName : 'Food item not found'} x {item.quantity}</p>
                                    <p>${item.price.toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            ) : (
                <p>No orders found.</p>
            )}
        </div>
    );
};

export default OrderHistory;
