export const getBeerCategories = async () => {
  const res = await fetch(`${process.env.API_URL}/api/v1/beer-categories`);
  const json = await res.json();
  if (!res.ok) throw json;

  return json;
};

export const getBeersGroupedByCategory = async () => {
  const res = await fetch(`${process.env.API_URL}/api/v1/beer-categories/grouped`);
  const json = await res.json();
  if (!res.ok) throw json;

  return json;
};

export const createBeerCategory = async (category) => {
  const res = await fetch(`${process.env.API_URL}/api/v1/beer-categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(category)
  });

  const json = await res.json();
  if (!res.ok) throw json;
  return json;
};

export const updateBeerCategory = async (id, category) => {
  const res = await fetch(`${process.env.API_URL}/api/v1/beer-categories/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(category)
  });

  const json = await res.json();
  if (!res.ok) throw json;
  return json;
};

export const deleteBeerCategory = async (id) => {
  const res = await fetch(`${process.env.API_URL}/api/v1/beer-categories/${id}`, {
    method: 'DELETE'
  });

  const json = await res.json();
  if (!res.ok) throw json;
  return json;
};
