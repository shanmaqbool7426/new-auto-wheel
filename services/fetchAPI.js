export const fetchAPI = async (url, options = {}) => {
  try {
    // Add timestamp for cache busting if needed
    const timestamp = new Date().getTime();
    const urlWithParams = new URL(url);
    
    // Only add cache-busting parameters if cache: 'no-store' is specified
    if (options.cache === 'no-store') {
      urlWithParams.searchParams.append('_t', timestamp);
    }

    // Base fetch options
    const fetchOptions = {
      ...options,
      headers: {
        ...options.headers,
        'Content-Type': 'application/json',
      }
    };

    // Handle caching strategy - either use no-store OR revalidate, not both
    if (options.cache === 'no-store') {
      fetchOptions.cache = 'no-store';
      fetchOptions.next = { revalidate: 0 }; // Force revalidation
    } else if (options.next?.revalidate) {
      // Only set revalidation if explicitly specified
      fetchOptions.next = {
        revalidate: options.next.revalidate
      };
      delete fetchOptions.cache; // Remove cache option when using revalidate
    } else {
      // Default to no-store if no specific cache option is set
      fetchOptions.cache = 'no-store';
      fetchOptions.next = { revalidate: 0 };
    }

    // Perform the fetch request
    const response = await fetch(url, {
      next: { revalidate: 60 } // revalidate every 60 seconds
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}, status: ${response.status}`);
    }

    return await response.json();

  } catch (error) {
    console.error("API call failed:", error);
    throw error;
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