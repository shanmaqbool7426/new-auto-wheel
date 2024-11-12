const API_BASE_URL = 'http://localhost:5000';

async function fetchWithAuth(url, options = {}) {
  // You might want to get the token from your auth solution
  const token = 'YOUR_AUTH_TOKEN';

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },  
  };
  

  // Ensure there's always a forward slash between base URL and endpoint
  const fullUrl = `${API_BASE_URL}/${url.replace(/^\//, '')}`;
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