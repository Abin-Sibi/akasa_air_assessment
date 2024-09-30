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

  const [isEdit, setIsEdit] = useState(false);

  const [foodItems, setFoodItems] = useState([]);

  const openModal = () => {setShowModal(true);
setIsEdit(false)
  };
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

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.image) {
//       alert('Please select an image.');
//       return;
//     }

//     const formDataToUpload = new FormData();
//     formDataToUpload.append('file', formData.image);
//     formDataToUpload.append('upload_preset', 'kjadhf739');

//     try {
//       const cloudinaryResponse = await axios.post(
//         'https://api.cloudinary.com/v1_1/dp2p38wb5/image/upload',
//         formDataToUpload,
//         { headers: { 'Content-Type': 'multipart/form-data' } }
//       );

//       const imageUrl = cloudinaryResponse.data.secure_url;
//       const foodItemData = {
//         ...formData,
//         imageUrl,
//       };

//       await axios.post('/add-food-item', foodItemData);
//       alert('Food item added successfully!');
//       closeModal();
//     } catch (error) {
//       alert('Error adding food item');
//       console.error(error);
//     }
//   };



  const handleEdit = (item) => {
    setFormData({
      _id: item._id, // Required for updating
      foodName: item.foodName,
      price: item.price,
      description: item.description,
      category: item.category,
      stock: item.stock,
      imageUrl: item.imageUrl,
    });
    setIsEdit(true);
    setShowModal(true);
  };
  

  

  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`/delete-food-item/${id}`);
        alert('Food item deleted successfully!');
        fetchFoodItems(); // Re-fetch the updated list
      } catch (error) {
        console.error('Error deleting food item:', error);
      }
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.image && !isEdit) {
      alert('Please select an image.');
      return;
    }
  
    let foodItemData = { ...formData };
  
    if (isEdit) {
      // Editing an existing food item
      try {
        await axios.put(`/update-food-item/${formData._id}`, foodItemData);
        alert('Food item updated successfully!');
      } catch (error) {
        console.error('Error updating food item:', error);
      }
    } else {
      // Creating a new food item
      try {
        if (formData.image) {
          const formDataToUpload = new FormData();
          formDataToUpload.append('file', formData.image);
          formDataToUpload.append('upload_preset', 'your_preset');
          const cloudinaryResponse = await axios.post('https://api.cloudinary.com/v1_1/dp2p38wb5/image/upload', formDataToUpload, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          foodItemData.imageUrl = cloudinaryResponse.data.secure_url;
        }
        await axios.post('/add-food-item', foodItemData);
        alert('Food item added successfully!');
      } catch (error) {
        console.error('Error adding food item:', error);
      }
    }
    closeModal();
    fetchFoodItems();
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
    <th>Image</th>
    <th>Food Name</th>
    <th>Price</th>
    <th>Category</th>
    <th>Description</th>
    <th>Stock</th>
    <th>Actions</th>
  </tr>
</thead>
<tbody>
  {foodItems.map((item) => (
    <tr key={item._id}>
      <td>
        <img src={item.imageUrl} alt={item.foodName} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
      </td>
      <td>{item.foodName}</td>
      <td>${item.price}</td>
      <td>{item.category}</td>
      <td>{item.description}</td>
      <td>{item.stock}</td>
      <td>
        <button onClick={() => handleEdit(item)}>Edit</button>
        <button onClick={() => handleDelete(item._id)}>Delete</button>
      </td>
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
              {isEdit? '':<div>
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
                    <option key={cat._id} value={cat.categoryName}>
                      {cat.categoryName}
                    </option>
                  ))}
                </select>
              </div>}
              
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
              {isEdit? '':
              <div>
                <label>Image</label>
                <input type="file" onChange={handleImageChange} required />
              </div>}
              {isEdit?<button type="submit">Update Product</button>:<button type="submit">Add Product</button>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
