import React from 'react';
import PropTypes from 'prop-types';

const MenuForm = ({
  item,
  detail,
  price,
  onChange,
  onSubmit
}) => (
  <form onSubmit={onSubmit}>
    <label htmlFor="item">Item</label>
    <input type="text" name="item" value={item} onChange={onChange} />

    <input type="text" name="detail" value={detail} onChange={onChange} />
    <label htmlFor="detail">Detail</label>

    <input type="number" name="price" value={price} onChange={onChange} />
    <label htmlFor="price">Price</label>
    
    <button>Create Menu Item</button>
  </form>
);

MenuForm.propTypes = {
  item: PropTypes.string.isRequired, 
  detail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default MenuForm;