import fetch from 'node-fetch';

export const postBeer = async(beer) => {
  const res = await fetch(`${process.env.API_URL}/api/v1/beers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(beer)
  });
  
  console.log(beer, 'sblfliuensflisnleifwnslsef');

  const json = await res.json();
  if(!res.ok) throw json;
  return json;
};

export const getBeers = async() => {
  const res = await fetch(`${process.env.API_URL}/api/v1/beers`);
  const json = await res.json();
  if(!res.ok) throw json;

  return json;
};

// updatebeer here ? 

export const deleteBeer = async(id) => {
  const res = await fetch(`${process.env.API_URL}/api/v1/beers/${id}`, {
    method: 'DELETE'
  });
  const json = await res.json();
  if(!res.ok) throw json;

  return json;
};