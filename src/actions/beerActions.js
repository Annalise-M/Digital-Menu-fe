import { deleteBeer, getBeers, postBeer } from '../services/api/beersApi';

export const PREPEND_BEER = 'PREPEND_BEER';
export const prependBeer = beer => ({
  type: PREPEND_BEER,
  payload: beer
});

export const SET_BEERS = 'SET_BEERS';
export const setBeers = beers => ({
  type: SET_BEERS,
  payload: beers
});

export const DELETE_BEER = 'DELETE_BEER';

export const createBeer = beer => dispatch => {
  postBeer(beer)
    .then(createdBeer => {
      dispatch(prependBeer(createdBeer));
    });
};

export const fetchBeers = () => dispatch => {
  getBeers()
    .then(beers => {
      dispatch(setBeers(beers));
    });
};

export const removeBeer = id => dispatch => {
  deleteBeer(id)
    .then(beer => {
      dispatch({
        type: DELETE_BEER,
        payload: beer.id
      });
    });
};

