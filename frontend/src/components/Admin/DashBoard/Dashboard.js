import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import axios from '../../../config/axiosConfig';

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    foodName: '',
    price: '',
    description: '',
    category: '',
    stock: '',
  });

  const [foodItems, setFoodItems] = useState([]);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchFoodItems = async () => {
    try {
      const response = await axios.get('/get-all-food');
      setFoodItems(response.data);
    } catch (error) {
      console.error('Error fetching food items:', error);
    }
  };

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
    fetchFoodItems();
    fetchCategories();
  }, [showModal]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      alert('Please select an image.');
      return;
    }

    const formDataToUpload = new FormData();
    formDataToUpload.append('file', formData.image);
    formDataToUpload.append('upload_preset', 'kjadhf739');

    try {
      const cloudinaryResponse = await axios.post(
        'https://api.cloudinary.com/v1_1/dp2p38wb5/image/upload',
        formDataToUpload,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      const imageUrl = cloudinaryResponse.data.secure_url;
      const foodItemData = {
        ...formData,
        imageUrl,
      };

      await axios.post('/add-food-item', foodItemData);
      alert('Food item added successfully!');
      closeModal();
    } catch (error) {
      alert('Error adding food item');
      console.error(error);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="content">
        <h1>Admin Dashboard</h1>
        <p>Welcome to the Admin Panel</p>
        <button onClick={openModal}>Add Product</button>

        <div className="food-items-list">
          <h2>Food Items</h2>
          <table>
            <thead>
              <tr>
                <th>Food Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Description</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {foodItems.map((item) => (
                <tr key={item._id}>
                  <td>{item.foodName}</td>
                  <td>${item.price}</td>
                  <td>{item.category}</td>
                  <td>{item.description}</td>
                  <td>{item.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat.name}>
                      {cat.name}
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
                <input type="file" onChange={handleImageChange} required />
              </div>
              <button type="submit">Add Product</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
