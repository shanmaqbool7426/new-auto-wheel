export const fetchAPI = async (url, options = {}) => {
  try {
    // Add cache-busting query parameters
    const timestamp = new Date().getTime();
    const random = Math.random();
    const urlWithParams = new URL(url);
    urlWithParams.searchParams.append('_t', timestamp);
    urlWithParams.searchParams.append('_r', random);

    // Set default options with proper caching strategy
    const fetchOptions = {
      ...options,
      headers: {
        ...options.headers,
        'Cache-Control': 'no-cache, no-store, must-revalidate, private',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
      next: {
        revalidate: 0 // This tells Next.js to fetch fresh data on each request
      },
      cache: 'no-store' // This ensures we always get fresh data
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
    // Log error but don't expose internal details
    console.error("API Request failed:", error.message);
    throw new Error("Failed to fetch data. Please try again later.");
  }
};

// Usage example:
// const data = await fetchAPI('https://api.example.com/data');