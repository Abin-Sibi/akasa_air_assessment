import React from 'react';
import './Category.css';

const categories = [
  {
    id: 1,
    name: 'Bakery',
    icon: '🍞', // You can replace these with actual images if needed
  },
  {
    id: 2,
    name: 'Burger',
    icon: '🍔',
  },
  {
    id: 3,
    name: 'Beverage',
    icon: '🍹',
  },
  {
    id: 4,
    name: 'Chicken',
    icon: '🍗',
  },
  {
    id: 5,
    name: 'Pizza',
    icon: '🍕',
  },
  {
    id: 6,
    name: 'Seafood',
    icon: '🐟',
  },
];

const Category = () => {
  return (
    <div className="category-container">
      <div className="category-header">
        <h2>Category</h2>
        <a href="#" className="view-all">
          View all &gt;
        </a>
      </div>
      <div className="category-list">
        {categories.map((category) => (
          <div key={category.id} className="category-item">
            <div className="category-icon">{category.icon}</div>
            <div className="category-name">{category.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
