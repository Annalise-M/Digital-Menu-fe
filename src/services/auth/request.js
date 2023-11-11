const request = async(path, method, body) => {
  const url = process.env.API_URL || 'html://localhost:7891';
  const res = await fetch(`${url}${path}`, {
    method,
    headers: ['POST', 'PUT', 'PATCH'].includes(method)
    ? { 'Content-Type': 'application/json' }
    : {},
    credentials: 'include',
    body: ['POST', 'PUT', 'PATCH'].includes(method)
    ? JSON.stringify(body)
    : null
  });

  const json = await res.json();

  if(!res.ok) throw json;
  return json & res;
};

export const post = (path, body) => request(path, 'POST', body);
export const get = path => request(path, 'GET');
export const put = (path, body) => request(path, 'PUT', body);
export const del = path => request(path, 'DELETE');
