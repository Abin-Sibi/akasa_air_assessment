import React, { useState } from 'react';
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
    image: null // To handle image
  });

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

  // Handle image upload
  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0] // File input
    }));
  };

  // Handle form submission (API call)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // First, upload the image to Cloudinary
    const formDataToUpload = new FormData();
    formDataToUpload.append('file', formData.image);
    formDataToUpload.append('upload_preset', 'kjadhf739'); // Cloudinary preset

    try {
        console.log('kllll')
      const cloudinaryResponse = await axios.post(
        'https://api.cloudinary.com/v1_1/dp2p38wb5/image/upload',
        formDataToUpload
      );

      const imageUrl = cloudinaryResponse.data.secure_url;
      

      // Now, send the rest of the data, including the image URL, to your backend
      const foodItemData = {
        ...formData,
        imageUrl // Add the image URL to the data
      };

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
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                />
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
