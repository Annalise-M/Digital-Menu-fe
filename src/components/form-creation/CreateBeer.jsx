import React, { useState } from 'react';
import { useCreateBeer } from '../../hooks/useBeers';
import FormField from './FormField';
import './createBeer.scss';

const CreateBeer = () => {
  const [formData, setFormData] = useState({
    brewery: '',
    style: '',
    abv: '',
    price: ''
  });

  const [errors, setErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const createBeer = useCreateBeer();

  const validateForm = () => {
    const newErrors = {};
    
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

    setSubmitSuccess(false);

    createBeer.mutate(
      {
        ...formData,
        abv: parseFloat(formData.abv),
        price: parseFloat(formData.price)
      },
      {
        onSuccess: () => {
          setFormData({
            brewery: '',
            style: '',
            abv: '',
            price: ''
          });
          setSubmitSuccess(true);
        },
        onError: () => {
          setErrors({
            submit: 'Failed to add beer. Please try again.'
          });
        }
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="create-beer-form">
      <h2>Add New Beer</h2>
      
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

      <FormField
        id="beer-price"
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
        <div className="success-message">Beer added successfully!</div>
      )}

      <button
        type="submit"
        disabled={createBeer.isPending}
        className={createBeer.isPending ? 'submitting' : ''}
      >
        {createBeer.isPending ? 'Adding...' : 'Add Beer'}
      </button>
    </form>
  );
};

export default CreateBeer;
