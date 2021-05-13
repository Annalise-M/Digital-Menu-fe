import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createMenu } from '../../actions/menuActions';

const CreateMenu = () => {
  // const [admin_id, setAdmin_id] = useState('');
  const [item, setItem] = useState('');
  const [detail, setDetail] = useState('');
  const [price, setPrice] = useState('');
  const dispatch = useDispatch();

  const handleChange = ({ target }) => {
    if(target.name === 'item') setItem(target.value);
    if(target.name === 'detail') setDetail(target.value);
    if(target.name === 'price') setPrice(target.value);
  };
  
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(createMenu({
      item,
      detail,
      price
    }));
    // setAdmin_id('');
    setItem('');
    setDetail('');
    setPrice('');
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="menu-item">Item</label>
      <input 
        id="menu-item"
        type="text" 
        name="item" 
        value={item} 
        onChange={handleChange} 
      />

      <label htmlFor="menu-detail">Detail</label>
      <input 
        id="menu-detail"
        type="text" 
        name="detail" 
        value={detail} 
        onChange={handleChange} 
      />

      <label htmlFor="menu-price">Price</label>
      <input 
        id="menu-price"
        type="number" 
        name="price" 
        value={price} 
        onChange={handleChange} 
      />
      
      <button>Add Menu Item</button>
    </form>
  );
}; 

export default CreateMenu;
