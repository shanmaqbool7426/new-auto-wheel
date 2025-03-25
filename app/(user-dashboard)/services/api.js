// const BASE_URL = 'http://localhost:5000';
import { BASE_URL } from '../../../constants/api-endpoints';
async function fetchWithAuth(url, options = {}) {
  const token = JSON.parse(localStorage.getItem('token'));

  console.log("token",token)
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token?.token?.token}`,
    },  
  };
  

  // Ensure there's always a forward slash between base URL and endpoint
  const fullUrl = `${BASE_URL}/${url.replace(/^\//, '')}`;
  console.log('Full URL:', fullUrl);

  const response = await fetch(fullUrl, {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export const api = {
  get: (url, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return fetchWithAuth(`${url}${queryString ? `?${queryString}` : ''}`);
  },
  post: (url, data) => fetchWithAuth(url, { method: 'POST', body: JSON.stringify(data) }),
  put: (url, data) => fetchWithAuth(url, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (url) => fetchWithAuth(url, { method: 'DELETE' }),
};