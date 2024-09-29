import React, { useState, useEffect } from 'react';
import './Category.css'; // Optional styling
import axios from '../../../config/axiosConfig'; // Make sure axios is properly configured
import { FaTrash, FaEdit } from 'react-icons/fa';

const Category = () => {
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    categoryName: '',
    image: null // For category image
  });
  const [editMode, setEditMode] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setFormData({ categoryName: '', image: null });
    setEditMode(false);
  };

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        // If edit mode, send update request
        await axios.put(`/edit-category/${editCategoryId}`, formData);
        alert('Category updated successfully!');
      } else {
        // First, upload the image to Cloudinary
        const imageFormData = new FormData();
        imageFormData.append('file', formData.image);
        imageFormData.append('upload_preset', 'kjadhf739'); // Change to your actual preset

        const cloudinaryResponse = await axios.post(
          'https://api.cloudinary.com/v1_1/dp2p38wb5/image/upload',
          imageFormData, { headers: { 'Content-Type': 'multipart/form-data' } }
        );

        const imageUrl = cloudinaryResponse.data.secure_url;

        // Now, send category data to the backend
        const categoryData = {
          categoryName: formData.categoryName,
          imageUrl
        };

        await axios.post('/add-category', categoryData);
        alert('Category added successfully!');
      }
      fetchCategories(); // Refresh category list
      closeModal(); // Close modal
    } catch (error) {
      console.error('Error adding/updating category:', error.response ? error.response.data : error.message);
    }
  };

  const handleEdit = (category) => {
    setEditMode(true);
    setEditCategoryId(category._id);
    setFormData({ categoryName: category.categoryName, image: null }); // No need to load image
    openModal();
  };

  const handleDelete = async (categoryId) => {
    try {
      await axios.delete(`/delete-category/${categoryId}`);
      fetchCategories(); // Refresh category list
      alert('Category deleted successfully!');
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div>
      <button onClick={openModal}>Add Category</button>
      
      {/* Modal Form */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>{editMode ? 'Edit Category' : 'Add Category'}</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Category Name</label>
                <input
                  type="text"
                  name="categoryName"
                  value={formData.categoryName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Category Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  accept="image/*"
                  required={!editMode} // Image upload not required in edit mode
                />
              </div>
              <button type="submit">{editMode ? 'Update' : 'Submit'}</button>
            </form>
          </div>
        </div>
      )}

      {/* Category List */}
      <div className="category-list">
        <h3>Category List</h3>
        <ul>
          {categories.map((category) => (
            <li key={category._id}>
              <img src={category.imageUrl} alt={category.categoryName} width="50" height="50" />
              {category.categoryName}
              <FaEdit onClick={() => handleEdit(category)} className="edit-btn" />
              <FaTrash onClick={() => handleDelete(category._id)} className="delete-btn" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Category;
