import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createMenu } from '../../actions/menuActions';
import FormField from './FormField';
import './createMenu.scss';

const CreateMenu = () => {
  const [formData, setFormData] = useState({
    item: '',
    detail: '',
    price: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const dispatch = useDispatch();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.item.trim()) {
      newErrors.item = 'Item name is required';
    }
    
    if (!formData.detail.trim()) {
      newErrors.detail = 'Item description is required';
    }
    
    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be a positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      await dispatch(createMenu({
        ...formData,
        price: parseFloat(formData.price)
      }));
      
      setFormData({
        item: '',
        detail: '',
        price: ''
      });
      setSubmitSuccess(true);
    } catch (error) {
      setErrors({
        submit: 'Failed to add menu item. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-menu-form">
      <h2>Add Menu Item</h2>
      
      <FormField
        id="menu-item"
        label="Item Name"
        name="item"
        value={formData.item}
        onChange={handleChange}
        error={errors.item}
        required
        placeholder="Enter item name"
      />

      <FormField
        id="menu-detail"
        label="Description"
        name="detail"
        value={formData.detail}
        onChange={handleChange}
        error={errors.detail}
        required
        placeholder="Enter item description"
      />

      <FormField
        id="menu-price"
        label="Price ($)"
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        error={errors.price}
        required
        placeholder="Enter price"
      />

      {errors.submit && (
        <div className="error-message">{errors.submit}</div>
      )}

      {submitSuccess && (
        <div className="success-message">Menu item added successfully!</div>
      )}

      <button 
        type="submit" 
        disabled={isSubmitting}
        className={isSubmitting ? 'submitting' : ''}
      >
        {isSubmitting ? 'Adding...' : 'Add Menu Item'}
      </button>
    </form>
  );
};

export default CreateMenu;
