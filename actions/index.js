"use server"
import { fetchAPI } from '@/services/fetchAPI';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

// Fetch Makes by Type from the Server
export const fetchMakesByTypeServer = async (type) => {
  try {
    const makes = await fetchAPI(API_ENDPOINTS.BROWSE.BY_MAKE + `?type=${encodeURIComponent(type)}`);
    return makes;
  } catch (error) {
    return {
      makes: [],
    };
  }
};

// Fetch Top Comparison by Type from the Server
export const fetchTopComparisonByTypeServer = async (type) => {
  try {
    const comparison = await fetchAPI(API_ENDPOINTS.COMPARISON.COMPARISON_LIST + `?type=${encodeURIComponent(type)}`);
    return comparison;
  } catch (error) {
    return {
      comparison: [],
    };
  }
};

// Post Data to Server
export const postDataToServer = async (url, payload) => {
  try {
    const response = await fetchAPI(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.status !== 200) {
      return {
        success: false,
        message: `Error ${response.status}: ${response.data.message || 'Failed to post data'}`,
      };
    }

    // Return the response data
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: 'An unexpected error occurred',
    };
  }
};

// Fetch Browse Blogs from the Server
export const fetchBrowseBlogsServer = async (type) => {
  try {
    const blogs = await fetchAPI(`${API_ENDPOINTS.BLOGS.BROWSE}${type ? `?type=${encodeURIComponent(type)}` : ''}`);
    return blogs?.data;
  } catch (error) {
    return {
      blogs: [],
    };
  }
};

// Fetch Browse Blogs from the Server
export const fetcSearchBlogsServer = async (params) => {
  try {
    const query = new URLSearchParams();
    if (params?.slug) query.append('query', params.query);
    if (params?.search) query.append('categories', params.categories);
    if (params?.type) query.append('type', params.type);
    const blogs = await fetchAPI(`${API_ENDPOINTS.BLOGS.SEARCH}?${query.toString()}`);
    return blogs?.data;
  } catch (error) {
    return {
      blogs: [],
    };
  }
};
// Fetch Video Data from the Server
export const fetchVideoDataServer = async (params) => {
  try {
    const query = new URLSearchParams();
    if (params?.slug) query.append('slug', params.slug);
    if (params?.search) query.append('search', params.search);
    if (params?.type) query.append('type', params.type);

    const videos = await fetchAPI(`${API_ENDPOINTS.VIDEOS.BROWSE}${query.toString() ? `?${query.toString()}` : ''}`);
    return videos?.data;
  } catch (error) {
    return {
      videos: [],
    };
  }
};

export const uploadImageServer = async (formData) => {
  try { 
    const response = await fetchAPI(API_ENDPOINTS.IMAGE_UPLOAD, {
      method: 'POST',
      body: formData,
    });

    return response?.data;
  } catch (error) {
    console.error("Image upload failed:", error);
    throw error;
  }
};
export const fetchUserDasboardOverview = async (token) => {
  try { 
    const response = await fetchAPI(API_ENDPOINTS.USER.GET_DASHBOARD_OVERVIEW, {
      headers: {
        'Authorization': token
      }
    });


    return response?.data;
  } catch (error) {
    console.error("Image upload failed:", error);
    throw error;
  }
};

export const fetchTopPerformingPosts = async (token,page=1,limit=6) => {
  try {
    const response = await fetchAPI(`${API_ENDPOINTS.VEHICLE.TOP_PERFORMING_POSTS}?page=${page}&limit=${limit}`, {
      headers: {
        'Authorization': token
      }
    });

    return response?.data;
  } catch (error) {
    console.error("Image upload failed:", error);
    throw error;
  }
};
export const fetchUserReviewsByDealerId = async (token,dealerId,page=1,limit=3) => {
  try { 
    const response = await fetchAPI(`${API_ENDPOINTS.USER_REVIEWS.GET_USER_REVIEWS_BY_DEALER_ID}/${dealerId}?page=${page}&limit=${limit}`, {
      headers: {
        'Authorization': token
      }
    });

    return response?.data;
  } catch (error) {
    console.error("Image upload failed:", error);
    throw error;
  }
};

export const fetchVehicleBySellerByVehicleId = async (token,vehicleId) => {
  try {
    const vehicle = await fetchAPI(
      API_ENDPOINTS.VEHICLE.DETAIL_BY_SELLER(vehicleId),
      {
        headers: {
          'Authorization': token
        }
      }
    );
    return vehicle;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return {
      vehicle: {},
    };
  }
};

export const fetchNearByLocation = async () => {
  try {
    const response = await fetchAPI(API_ENDPOINTS.NEAR_BY_LOCATION.GET);

    return response?.data;
  } catch (error) {
    console.error("Error fetching near by location:", error);
    throw error;
  }
  };

