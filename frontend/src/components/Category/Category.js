import React, { useEffect, useState } from 'react';
import './Category.css';
import axios from '../../config/axiosConfig';

// const categories = [
//   {
//     id: 1,
//     name: 'Bakery',
//     icon: '🍞', // You can replace these with actual images if needed
//   },
//   {
//     id: 2,
//     name: 'Burger',
//     icon: '🍔',
//   },
//   {
//     id: 3,
//     name: 'Beverage',
//     icon: '🍹',
//   },
//   {
//     id: 4,
//     name: 'Chicken',
//     icon: '🍗',
//   },
//   {
//     id: 5,
//     name: 'Pizza',
//     icon: '🍕',
//   },
//   {
//     id: 6,
//     name: 'Seafood',
//     icon: '🐟',
//   },
// ];

const Category = () => {
    
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {

        try {
          const response = await axios.get('/get-categories');
          setCategories(response.data);
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      };
    
      useEffect(() => {
        fetchCategories(); // Fetch categories on component mount
      }, []);
  return (
    <div className="user-category-container ">
      <div className="category-header">
        <h2>Category</h2>
        <a href="#" className="view-all">
          View all &gt;
        </a>
      </div>
      <div className="category-list">
  {categories.map((category) => (
    <div key={category.id} className="category-item">
      <div className="category-icon">
        <img src={category.imageUrl} alt={category.categoryName} className="category-image" />
      </div>
      <div className="category-name">{category.categoryName}</div>
    </div>
  ))}
</div>

    </div>
  );
};

export default Category;
