import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBeers, removeBeer } from '../../actions/beerActions';
import { selectBeers } from '../../selectors/beerSelectors';

const BeerList = () => {
  const beers = useSelector(selectBeers);
  const dispatch = useDispatch();
  const beerCard = React.createRef();
  // const container = React.createRef();

  useEffect(() => {
    dispatch(fetchBeers());
  }, []);

  // useEffect(() => {
  //   Draggable.create('.menuCard', {
  //     bounds: container,
  //     type: 'x, y'
  //   });
  // }, [])

  const handleDelete = ({ target }) => {
    dispatch(removeBeer(target.value));
  };

  const beerElements = beers.map(beer => (
      <li key={beer.id} ref={beerCard} id="beerCard">
        <p>{beer.brewery}</p>
        <p>{beer.style}</p>
        <p>{beer.abv}</p>
        <p>{beer.price}</p>
        <button value={beer.id} onClick={handleDelete}>🗑️</button>
      </li>
  ));

  return (
    <ul data-testid="beers">
      {beerElements}
    </ul>
  );
};

export default BeerList;
