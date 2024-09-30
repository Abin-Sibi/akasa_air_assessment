import React, { useState, useEffect } from 'react';
import './Category.css';
import axios from '../../../config/axiosConfig';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';

const Category = () => {
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    categoryName: '',
    image: null
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
    fetchCategories();
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
        await axios.put(`/edit-category/${editCategoryId}`, formData);
        alert('Category updated successfully!');
      } else {
        const imageFormData = new FormData();
        imageFormData.append('file', formData.image);
        imageFormData.append('upload_preset', 'kjadhf739');

        const cloudinaryResponse = await axios.post(
          'https://api.cloudinary.com/v1_1/dp2p38wb5/image/upload',
          imageFormData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );

        const imageUrl = cloudinaryResponse.data.secure_url;

        const categoryData = {
          categoryName: formData.categoryName,
          imageUrl
        };

        await axios.post('/add-category', categoryData);
        alert('Category added successfully!');
      }
      fetchCategories();
      closeModal();
    } catch (error) {
      console.error('Error adding/updating category:', error.response ? error.response.data : error.message);
    }
  };

  const handleEdit = (category) => {
    setEditMode(true);
    setEditCategoryId(category._id);
    setFormData({ categoryName: category.categoryName, image: null });
    openModal();
  };

  const handleDelete = async (categoryId) => {
    try {
      await axios.delete(`/delete-category/${categoryId}`);
      fetchCategories();
      alert('Category deleted successfully!');
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div className="category-container">
      <div className="header-category">
        <h2>Manage Categories</h2>
        <button className="add-category-btn" onClick={openModal}>
          <FaPlus /> Add Category
        </button>
      </div>

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
                  required={!editMode}
                />
              </div>
              <button type="submit" className="submit-btn">
                {editMode ? 'Update' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Category List */}
      <div className="category-list">
        {categories.length > 0 ? (
          categories.map((category) => (
            <div className="category-card" key={category._id}>
              <img src={category.imageUrl} alt={category.categoryName} />
              <div className="category-info">
                <h4>{category.categoryName}</h4>
                <div className="actions">
                  <FaEdit onClick={() => handleEdit(category)} className="edit-btn" />
                  <FaTrash onClick={() => handleDelete(category._id)} className="delete-btn" />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No categories available.</p>
        )}
      </div>
    </div>
  );
};

export default Category;
