// export const fetchAPI = async (url,options = {}) => {
//   console.log("🚀 ~ fetchAPI ~ options:", options)
//   const response = await fetch(url, options);
//   if (!response.ok) {
//     throw new Error(`Failed to fetch ${url}`);
//   }
//   return response.json();
// };


export const fetchAPI = async (url, options = {}) => {
  console.log("🚀 ~ fetchAPI ~ url:", url);
  console.log("🚀 ~ fetchAPI ~ options:", options);

  try {
    // Set default options to include cache control with 'no-store'
    const fetchOptions = {
      ...options,
      cache: 'no-store',  // Ensure the response is not cached
    };

    // Perform the fetch request with the updated options
    const response = await fetch(url, fetchOptions);

    // Check if the response is ok (status in the range 200-299)
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}, status: ${response.status}`);
    }

    // Parse and return JSON data
    const data = await response.json();
    
    return data;
  } catch (error) {
    // Log and handle errors
    console.error("🚀 ~ fetchAPI ~ error:", error);
    throw error;
  }
};



