import React from 'react';
import './RecentOrders.css';

const recentOrders = [
  {
    id: 1,
    name: 'Fish Burger',
    price: 5.59,
    image: `${process.env.PUBLIC_URL}/images/burg.png`,
    distance: '4.97 km',
    time: '21 min',
    isFavorite: true,
  },
  {
    id: 2,
    name: 'Japan Ramen',
    price: 5.59,
    image: `${process.env.PUBLIC_URL}/images/burg.png`,
    distance: '4.97 km',
    time: '21 min',
    isFavorite: false,
  },
  {
    id: 3,
    name: 'Fried Rice',
    price: 5.59,
    image: `${process.env.PUBLIC_URL}/images/burg.png`,
    distance: '4.97 km',
    time: '21 min',
    isFavorite: false,
  },
  {
    id: 4 ,
    name: 'Fried Rice',
    price: 5.59,
    image: `${process.env.PUBLIC_URL}/images/burg.png`,
    distance: '4.97 km',
    time: '21 min',
    isFavorite: false,
  },
  {
    id: 5,
    name: 'Fried Rice',
    price: 5.59,
    image: `${process.env.PUBLIC_URL}/images/burg.png`,
    distance: '4.97 km',
    time: '21 min',
    isFavorite: false,
  },
];

const RecentOrders = () => {
  return (
    <div className="recent-orders-container">
      <div className="recent-orders-header">
        <h2>Recent Order</h2>
        <a href="#" className="view-all">
          View order history &gt;
        </a>
      </div>
      <div className="orders-list">
        {recentOrders.map((order) => (
          <div key={order.id} className="order-card">
            <img src={order.image} alt={order.name} className="order-image" />
            <h3 className="order-name">{order.name}</h3>
            <div className="order-price">${order.price}</div>
            <div className="order-details">
              {order.distance} &middot; {order.time}
            </div>
            {order.isFavorite && <div className="favorite-icon">❤️</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentOrders;
