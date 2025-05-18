import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBeer } from '../../actions/beerActions';
import { createMenu } from '../../actions/menuActions';
import FormField from './FormField';
import './combinedForm.scss';

const CombinedForm = () => {
  const [formType, setFormType] = useState('beer'); // 'beer' or 'menu'
  const [formData, setFormData] = useState({
    // Beer fields
    brewery: '',
    style: '',
    abv: '',
    // Menu fields
    item: '',
    detail: '',
    // Shared fields
    price: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const dispatch = useDispatch();

  const validateForm = () => {
    const newErrors = {};
    
    if (formType === 'beer') {
      if (!formData.brewery.trim()) {
        newErrors.brewery = 'Brewery name is required';
      }
      
      if (!formData.style.trim()) {
        newErrors.style = 'Beer style is required';
      }
      
      if (!formData.abv) {
        newErrors.abv = 'ABV is required';
      } else if (isNaN(formData.abv) || parseFloat(formData.abv) <= 0 || parseFloat(formData.abv) > 100) {
        newErrors.abv = 'ABV must be a number between 0 and 100';
      }
    } else {
      if (!formData.item.trim()) {
        newErrors.item = 'Item name is required';
      }
      
      if (!formData.detail.trim()) {
        newErrors.detail = 'Item description is required';
      }
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
      if (formType === 'beer') {
        await dispatch(createBeer({
          brewery: formData.brewery,
          style: formData.style,
          abv: parseFloat(formData.abv),
          price: parseFloat(formData.price)
        }));
      } else {
        await dispatch(createMenu({
          item: formData.item,
          detail: formData.detail,
          price: parseFloat(formData.price)
        }));
      }
      
      // Reset only the relevant fields
      setFormData(prev => ({
        ...prev,
        ...(formType === 'beer' 
          ? { brewery: '', style: '', abv: '', price: '' }
          : { item: '', detail: '', price: '' }
        )
      }));
      setSubmitSuccess(true);
    } catch (error) {
      setErrors({
        submit: `Failed to add ${formType === 'beer' ? 'beer' : 'menu item'}. Please try again.`
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFormType = () => {
    setFormType(prev => prev === 'beer' ? 'menu' : 'beer');
    setErrors({});
    setSubmitSuccess(false);
  };

  return (
    <div className="combined-form-container">
      <div className="form-toggle">
        <button
          type="button"
          className={`toggle-btn ${formType === 'beer' ? 'active' : ''}`}
          onClick={() => formType !== 'beer' && toggleFormType()}
        >
          Add Beer
        </button>
        <button
          type="button"
          className={`toggle-btn ${formType === 'menu' ? 'active' : ''}`}
          onClick={() => formType !== 'menu' && toggleFormType()}
        >
          Add Menu Item
        </button>
      </div>

      <form onSubmit={handleSubmit} className="combined-form">
        <h2>{formType === 'beer' ? 'Add New Beer' : 'Add Menu Item'}</h2>
        
        {formType === 'beer' ? (
          <div>
            <FormField
              id="beer-brewery"
              label="Brewery"
              name="brewery"
              value={formData.brewery}
              onChange={handleChange}
              error={errors.brewery}
              required
              placeholder="Enter brewery name"
            />

            <FormField
              id="beer-style"
              label="Style"
              name="style"
              value={formData.style}
              onChange={handleChange}
              error={errors.style}
              required
              placeholder="Enter beer style"
            />

            <FormField
              id="beer-abv"
              label="ABV (%)"
              name="abv"
              type="number"
              value={formData.abv}
              onChange={handleChange}
              error={errors.abv}
              required
              placeholder="Enter ABV percentage"
            />
          </div>
        ) : (
          <div>
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
          </div>
        )}

        <FormField
          id={`${formType}-price`}
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
          <div className="success-message">
            {formType === 'beer' ? 'Beer' : 'Menu item'} added successfully!
          </div>
        )}

        <button 
          type="submit" 
          disabled={isSubmitting}
          className={isSubmitting ? 'submitting' : ''}
        >
          {isSubmitting ? 'Adding...' : `Add ${formType === 'beer' ? 'Beer' : 'Menu Item'}`}
        </button>
      </form>
    </div>
  );
};

export default CombinedForm; 