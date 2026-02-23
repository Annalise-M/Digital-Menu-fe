import React from 'react';
import { useBeers, useDeleteBeer, useUpdateBeer } from '../../hooks/useBeers';
import DraggableGrid from './DraggableGrid';

const BeerList = () => {
  const { data: beers = [], isLoading, error } = useBeers();
  const deleteBeer = useDeleteBeer();
  const updateBeer = useUpdateBeer();

  const handleDelete = ({ target }) => {
    deleteBeer.mutate(target.value);
  };

  const handleToggleAvailability = (beer) => {
    updateBeer.mutate({
      id: beer.id,
      brewery: beer.brewery,
      style: beer.style,
      abv: beer.abv,
      price: beer.price,
      available: !beer.available
    });
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
            checked={!beer.available}
            onChange={() => handleToggleAvailability(beer)}
          />
          <label htmlFor={`strike-${beer.id}`}>Sold Out</label>
        </div>
        <p className={!beer.available ? 'strike-through' : ''}>{beer.brewery}</p>
        <p className={!beer.available ? 'strike-through' : ''}>{beer.style}</p>
        <p className={!beer.available ? 'strike-through' : ''}>${formatPrice(beer.price)}</p>
        <p className={`abv ${!beer.available ? 'strike-through' : ''}`}>{beer.abv}% ABV</p>
      </div>
      <button value={beer.id} onClick={handleDelete}>🗑️</button>
    </div>
  ));

  if (isLoading) return <div className="beer-list-container"><h2>Loading beers...</h2></div>;
  if (error) return <div className="beer-list-container"><h2>Error loading beers: {error.message}</h2></div>;

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
