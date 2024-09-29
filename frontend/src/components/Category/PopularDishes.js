import React from 'react';
import './PopularDishes.css';

const popularDishes = [
  {
    id: 1,
    name: 'Fish Burger',
    price: 5.59,
    image: `${process.env.PUBLIC_URL}/images/burg.png`, // Replace with actual image paths
    isFavorite: true,
    discount: '15% Off',
    rating: 5,
  },
  {
    id: 2,
    name: 'Beef Burger',
    price: 5.59,
    image: `${process.env.PUBLIC_URL}/images/burg.png`,
    isFavorite: false,
    discount: '15% Off',
    rating: 4.5,
  },
  {
    id: 3,
    name: 'Cheese Burger',
    price: 5.59,
    image: `${process.env.PUBLIC_URL}/images/burg.png`,
    isFavorite: false,
    discount: '15% Off',
    rating: 4,
  },
];

const PopularDishes = () => {
  return (
    <div className="popular-dishes-container">
      <div className="popular-dishes-header">
        <h2>Popular Dishes</h2>
      </div>
      <div className="dishes-list">
        {popularDishes.map((dish) => (
          <div key={dish.id} className="dish-card">
            <div className="dish-discount">{dish.discount}</div>
            <img src={dish.image} alt={dish.name} className="dish-image" />
            <h3 className="dish-name">{dish.name}</h3>
            <div className="dish-rating">⭐ {dish.rating}</div>
            <div className="dish-price">${dish.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularDishes;
