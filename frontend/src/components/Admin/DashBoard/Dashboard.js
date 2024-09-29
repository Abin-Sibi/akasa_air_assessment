import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import axios from '../../../config/axiosConfig';
import SideBar from '../AdminSideBar/SideBar';

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    foodName: '',
    price: '',
    description: '',
    category: '',
    stock: '',
  });

  const [foodItems,setFoodItems] = useState([])

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Fetch all food items from the API
  const fetchFoodItems = async () => {
    try {
      const response = await axios.get('/get-all-food'); // Change API endpoint accordingly
      setFoodItems(response.data); // Update state with fetched food items
    } catch (error) {
      console.error('Error fetching food items:', error);
    }
  };

  const [categories, setCategories] = useState([]); // To store the fetched categories

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/get-categories'); // Adjust endpoint as needed
      setCategories(response.data); // Set the fetched categories in state
      console.log(response.data,'hhh')
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchFoodItems();
    fetchCategories(); // Fetch the food items initially
  }, [showModal]);



  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file); // Check if the file is being selected
    setFormData((prev) => ({
      ...prev,
      image: file // Ensure the file is correctly set in the state
    }));
  };
  

  // Handle form submission (API call)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {
        alert('Please select an image.');
        return;
      }
    // First, upload the image to Cloudinary
    const formDataToUpload = new FormData();
    formDataToUpload.append('file', formData.image);
    formDataToUpload.append('upload_preset', 'kjadhf739'); // Cloudinary preset

    

    try {
      const cloudinaryResponse = await axios.post(
        'https://api.cloudinary.com/v1_1/dp2p38wb5/image/upload',
        formDataToUpload
        , { headers: { 'Content-Type': 'multipart/form-data' } }, { withCredentials: false });

      const imageUrl = cloudinaryResponse.data.secure_url;

      

      // Now, send the rest of the data, including the image URL, to your backend
      const foodItemData = {
        ...formData,
        imageUrl // Add the image URL to the data
      };

      console.log(foodItemData,'yiuiuiuiu')
      const response = await axios.post('/add-food-item', foodItemData);
      alert('Food item added successfully!');
      closeModal();
    } catch (error) {
      alert('Error adding food item');
      console.error(error);
    }
  };

  return (
    <div className="admin-dashboard">
      <SideBar />
      <div className="content">
        <h1>Admin Dashboard</h1>
        <p>Welcome to the Admin Panel</p>
        <button onClick={openModal}>Add Product</button>

        <div className="food-items-list">
          <h2>Food Items</h2>
          <ul>
            {foodItems.map((item) => (
              <li key={item._id}>
                {item.foodName} - ${item.price} - {item.category} (Stock: {item.stock})
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Add Food Item</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Food Name</label>
                <input
                  type="text"
                  name="foodName"
                  value={formData.foodName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Description</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select a category</option>
          {categories.map((category) => (
            <option key={category._id} value={category.categoryName}>
              {category.categoryName}
            </option>
          ))}
        </select>
      </div>
              <div>
                <label>Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  accept="image/*"
                  required
                />
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;