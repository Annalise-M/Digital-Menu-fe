import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBeer } from '../../actions/beerActions';


// Should I place the reference in the element that's being corrected ? 
const CreateBeer = () => {
  const [brewery, setBrewery] = useState('');
  const [style, setStyle] = useState('');
  const [abv, setAbv] = useState('');
  const [price, setPrice] = useState('');

  const dispatch = useDispatch();

  const handleChange = ({ target }) => {
    if(target.name === 'brewery') setBrewery(target.value);
    if(target.name === 'style') setStyle(target.value);
    if(target.name === 'abv') setAbv(target.value);
    if(target.name === 'price') setPrice(target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(createBeer({
      brewery,
      style,
      abv,
      price
    }));
    setBrewery('');
    setStyle('');
    setAbv('');
    setPrice('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="beer-brewery">Brewery</label>
      <input 
        id="beer-brewery"
        type="text"
        name="brewery"
        value={brewery}
        onChange={handleChange}
      />
      <label htmlFor="beer-style">Style</label>
      <input 
        id="beer-brewery"
        type="text"
        name="style"
        value={style}
        onChange={handleChange}
      />
      <label htmlFor="beer-abv">ABV</label>
      <input 
        id="beer-brewery"
        type="text"
        name="abv"
        value={abv}
        onChange={handleChange}
      />
      <label htmlFor="beer-price">Price</label>
      <input 
        id="beer-brewery"
        type="text"
        name="price"
        value={price}
        onChange={handleChange}
      />
      <button>Add Beer</button>
    </form>
  );
};

export default CreateBeer;
