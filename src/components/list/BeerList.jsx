import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBeers, removeBeer } from '../../actions/beerActions';
import { selectBeers } from '../../selectors/beerSelectors';
import DraggableGrid from './DraggableGrid';

const BeerList = () => {
  const beers = useSelector(selectBeers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBeers());
  }, []);

  const handleDelete = ({ target }) => {
    dispatch(removeBeer(target.value));
  };

  const beerElements = beers.map(beer => (
    <div key={beer.id} className="grid-item">
      <p>{beer.brewery}</p>
      <p>{beer.style}</p>
      <p>{beer.abv}</p>
      <p>{beer.price}</p>
      <button value={beer.id} onClick={handleDelete}>🗑️</button>
    </div>
  ));

  return (
    <div data-testid="beers">
      <DraggableGrid>
        {beerElements}
      </DraggableGrid>
    </div>
  );
};

export default BeerList;
