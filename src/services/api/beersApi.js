export const postBeer = async(beer) => {
  const res = await fetch(`${process.env.API_URL}/api/v1/beers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(beer)
  });

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

export const bulkImportBeers = async(items) => {
  const res = await fetch(`${process.env.API_URL}/api/v1/beers/bulk-import`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ items })
  });

  const json = await res.json();
  if(!res.ok) throw json;
  return json;
};