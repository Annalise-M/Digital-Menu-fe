export const getMenuCategories = async () => {
  const res = await fetch(`${process.env.API_URL}/api/v1/menu-categories`);
  const json = await res.json();
  if (!res.ok) throw json;

  return json;
};

export const getMenusGroupedByCategory = async () => {
  const res = await fetch(`${process.env.API_URL}/api/v1/menu-categories/grouped`);
  const json = await res.json();
  if (!res.ok) throw json;

  return json;
};

export const createMenuCategory = async (category) => {
  const res = await fetch(`${process.env.API_URL}/api/v1/menu-categories`, {
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

export const updateMenuCategory = async (id, category) => {
  const res = await fetch(`${process.env.API_URL}/api/v1/menu-categories/${id}`, {
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

export const deleteMenuCategory = async (id) => {
  const res = await fetch(`${process.env.API_URL}/api/v1/menu-categories/${id}`, {
    method: 'DELETE'
  });

  const json = await res.json();
  if (!res.ok) throw json;
  return json;
};
