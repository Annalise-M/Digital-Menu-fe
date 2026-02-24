const request = async(path, method, body) => {
  const url = `${process.env.API_URL}${path}`;
  console.log('🔍 DEBUG - Fetching URL:', url);
  console.log('🔍 DEBUG - API_URL:', process.env.API_URL);

  const res = await fetch(url, {
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
  return json;
};

export const post = (path, body) => request(path, 'POST', body);
export const get = path => request(path, 'GET');
export const put = (path, body) => request(path, 'PUT', body);
export const del = path => request(path, 'DELETE');
