export const fetchAPI = async (url, options = {}) => {
  try {
    // Add cache-busting query parameters
    const timestamp = new Date().getTime();
    const random = Math.random();
    const urlWithParams = new URL(url);
    urlWithParams.searchParams.append('_t', timestamp);
    urlWithParams.searchParams.append('_r', random);

    // Set default options with comprehensive cache-busting headers
    const fetchOptions = {
      ...options,
      cache: 'no-store',
      headers: {
        ...options.headers,
        'Cache-Control': 'no-cache, no-store, must-revalidate, private',
        'Pragma': 'no-cache',
        'Expires': '0',
        'If-None-Match': random.toString(), // Prevent If-None-Match header matching
      },
      next: {
        revalidate: 0,
        tags: [`request-${timestamp}`]
      }
    };

    // Perform the fetch request with the updated options
    const response = await fetch(urlWithParams, fetchOptions);

    // Check if the response is ok (status in the range 200-299)
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}, status: ${response.status}`);
    }

    // Parse and return JSON data
    const data = await response.json();
    return data;

  } catch (error) {
    console.error("🚀 ~ fetchAPI ~ error:", error);
    throw error;
  }
};

// Usage example:
// const data = await fetchAPI('https://api.example.com/data');