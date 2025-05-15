export const fetchAPI = async (url, options = {}) => {
  try {
    const defaultOptions = {
      next: {
        revalidate: 300, // Cache for 5 minutes
      },
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(url, {
      ...defaultOptions,
      ...options,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}, status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API call failed:', error);
    return null;
  }
};

// Helper functions for different caching strategies
export const fetchWithNoCache = (url, options = {}) => {
  return fetchAPI(url, {
    ...options,
    cache: 'no-store'
  });
};

export const fetchWithCache = (url, revalidateTime = 3600, options = {}) => {
  return fetchAPI(url, {
    ...options,
    next: { revalidate: revalidateTime }
  });
};

// Usage examples:
/*
// For dynamic data that should never be cached:
const dynamicData = await fetchWithNoCache('/api/dynamic-data');

// For static data that can be cached:
const staticData = await fetchWithCache('/api/static-data', 3600); // Cache for 1 hour

// For custom fetch options:
const data = await fetchAPI('/api/data', {
  cache: 'no-store',  // OR next: { revalidate: 3600 }, but not both
  method: 'POST',
  body: JSON.stringify({ ... })
});
*/