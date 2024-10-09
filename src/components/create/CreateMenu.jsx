import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createMenu } from '../../actions/menuActions';

const CreateMenu = () => {
  const [item, setItem] = useState('');
  const [detail, setDetail] = useState('');
  const [price, setPrice] = useState('');
  // const [lineItem, setLineItem] = onChange(''); ???
  const dispatch = useDispatch();

  const handleChange = ({ target }) => {
    if(target.name === 'item') setItem(target.value);
    if(target.name === 'detail') setDetail(target.value);
    if(target.name === 'price') setPrice(target.value);
    // if(target.id === 'lineItem') createContext(target.value);
  };
  
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(createMenu({
      item,
      detail,
      price
    }));
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
        type="text" 
        name="price" 
        value={price} 
        onChange={handleChange} 
      />

      {/* radio button for strikethrough option for updateMenu ? on menuList ?*/}

      <button>Add Menu Item</button>
    </form>
  );
}; 

export default CreateMenu;
