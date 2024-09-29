import React, { useState, useEffect } from 'react';
import axios from '../../config/axiosConfig';
import './FoodOrder.css';
import { useCart } from '../../cartContext';

const FoodOrder = () => {
    const [foodItems, setFoodItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const { addToCart } = useCart();

    const user = JSON.parse(localStorage.getItem('user'));

    // Fetch data from the backend using Axios
    useEffect(() => {
        axios.get('/get-all-food') // Replace with actual endpoint
            .then(response => {
                setFoodItems(response.data);
                console.log(response.data)
            })
            .catch(error => console.error('Error fetching food items:', error));
    }, []);



    // Handle search functionality
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    // Handle filtering by category
    const handleFilterChange = (event) => {
        setFilterCategory(event.target.value);
    };

    // Handle sorting
    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
    };

    // Add item to cart
    const handleAddToCart = async(item) => {
        try{

        if (item.stock > 0) {
            // Logic to add item to cart
            const response = await axios.post('/cart/add-to-cart', {userId:user._id, productId: item._id,quantity:1 });
            if (response.status === 200) {
              // Update global cart state on successful API call
              addToCart(response.data.cart.length)
              console.log(response.data.cart.length,'hellsafd')
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

    // Filter and sort food items based on search, category, and stock availability
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
                    <option value="burger">Burger</option>
                    <option value="pizza">Pizza</option>
                    <option value="beverage">Beverage</option>
                    {/* Add more categories */}
                </select>

                <select onChange={handleSortChange}>
                    <option value="asc">Price: Low to High</option>
                    <option value="desc">Price: High to Low</option>
                </select>
            </div>

            <div className="food-items">
                {filteredItems.map(item => (
                    <div className="food-item-card" key={item.id}>
                        <img src={item.imageUrl} alt={item.foodName} />
                        <h3>{item.foodName}</h3>
                        <p>{item.price}</p>
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
