import React, { useState, useEffect } from 'react';
import axios from '../../config/axiosConfig';
import './FoodOrder.css';
import { useCart } from '../../cartContext';
import { useLocation } from 'react-router-dom';

const FoodOrder = () => {
    const [foodItems, setFoodItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const { addToCart, cartCount } = useCart();
    const location = useLocation();
  const { category } = location.state || {}; 

    const user = JSON.parse(localStorage.getItem('user'));

    const fetchFoodItems = async () => {
        await axios.get('/get-all-food')
            .then(response => {
                setFoodItems(response.data);
                console.log(response.data);
            })
            .catch(error => console.error('Error fetching food items:', error));
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('/get-categories'); // Replace with your actual endpoint
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        fetchFoodItems();
        fetchCategories();
        if(category){
            setFilterCategory(category)
        }else{
            setFilterCategory('')
        }
    }, [cartCount]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleFilterChange = (event) => {
        setFilterCategory(event.target.value);
    };

    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
    };

    const handleAddToCart = async (item) => {
        try {
            if (item.stock > 0) {
                const response = await axios.post('/cart/add-to-cart', {
                    userId: user._id,
                    productId: item._id,
                    quantity: 1
                });
                if (response.status === 200) {
                    addToCart(response.data.cart.length);
                    alert('Item added to cart!');
                }
            } else {
                alert('Out of stock');
            }
        } catch (error) {
            console.error('Error adding item to cart:', error);
            alert('Failed to add item to cart');
        }
    };

    const filteredItems = foodItems
        .filter(item =>
            item.foodName.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (!filterCategory || item.category === filterCategory)
        )
        .sort((a, b) =>
            sortOrder === 'asc' ? a.price - b.price : b.price - a.price
        );

    return (
        <div className="food-order-page">
            <h2 className="order-history-heading">Order Your Fooood</h2>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search for food..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>

            <div className="filter-bar">
                <select onChange={handleFilterChange}>
                    <option value="">All Categories</option>
                    {categories.map(category => (
                        <option key={category._id} value={category.categoryName}>{category.categoryName}</option>
                    ))}
                </select>

                <select onChange={handleSortChange}>
                    <option value="asc">Price: Low to High</option>
                    <option value="desc">Price: High to Low</option>
                </select>
            </div>

            <div className="food-items">
                {filteredItems.map(item => (
                    <div className="food-item-card" key={item._id}>
                        <img src={item.imageUrl} alt={item.foodName} />
                        <h3>{item.foodName}</h3>
                        <p>${item.price.toFixed(2)}</p>
                        <p>Stock: {item.stock > 0 ? item.stock : 'Out of stock'}</p>
                        <button
                            disabled={item.stock === 0}
                            onClick={() => handleAddToCart(item)}
                        >
                            {item.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FoodOrder;
