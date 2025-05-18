import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBeers, removeBeer } from '../../actions/beerActions';
import { selectBeers } from '../../selectors/beerSelectors';
import DraggableGrid from './DraggableGrid';

const BeerList = () => {
  const beers = useSelector(selectBeers);
  const dispatch = useDispatch();
  const [strikethroughItems, setStrikethroughItems] = useState({});

  useEffect(() => {
    dispatch(fetchBeers());
  }, []);

  const handleDelete = ({ target }) => {
    dispatch(removeBeer(target.value));
  };

  const handleStrikethrough = (id) => {
    setStrikethroughItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const formatPrice = (price) => {
    const numPrice = parseFloat(price);
    return isNaN(numPrice) ? '0.00' : numPrice.toFixed(2);
  };

  const beerElements = beers.map(beer => (
    <div key={beer.id} className="grid-item">
      <div className="content-wrapper">
        <div className="toggle-wrapper">
          <input
            type="checkbox"
            className="toggle-button"
            id={`strike-${beer.id}`}
            checked={strikethroughItems[beer.id] || false}
            onChange={() => handleStrikethrough(beer.id)}
          />
          <label htmlFor={`strike-${beer.id}`}>Sold Out</label>
        </div>
        <p className={strikethroughItems[beer.id] ? 'strike-through' : ''}>{beer.brewery}</p>
        <p className={strikethroughItems[beer.id] ? 'strike-through' : ''}>{beer.style}</p>
        <p className={strikethroughItems[beer.id] ? 'strike-through' : ''}>${formatPrice(beer.price)}</p>
        <p className={`abv ${strikethroughItems[beer.id] ? 'strike-through' : ''}`}>{beer.abv}% ABV</p>
      </div>
      <button value={beer.id} onClick={handleDelete}>🗑️</button>
    </div>
  ));

  return (
    <div data-testid="beers" className="beer-list-container">
      <h2>Beer Selection</h2>
      <DraggableGrid>
        {beerElements}
      </DraggableGrid>
    </div>
  );
};

export default BeerList;
