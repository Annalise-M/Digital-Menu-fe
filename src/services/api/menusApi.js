// const fetch = require('node-fetch');
import fetch from 'node-fetch';

export const postMenu = async(menu) => {
  // const token = useAuthLoading('TOKEN');
  const res = await fetch(`${process.env.API_URL}/api/v1/menus`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(menu)
  });
  
  console.log(menu, 'sblfliuensflisnleifwnslsef');

  const json = await res.json();
  if(!res.ok) throw json;
  return json;
};

export const getMenus = async() => {
  const res = await fetch(`${process.env.API_URL}/api/v1/menus`);
  const json = await res.json();
  if(!res.ok) throw json;

  return json;
};

// updateMenu here ? 

export const deleteMenu = async(id) => {
  const res = await fetch(`${process.env.API_URL}/api/v1/menus/${id}`, {
    method: 'DELETE'
  });
  const json = await res.json();
  if(!res.ok) throw json;

  return json;
};
