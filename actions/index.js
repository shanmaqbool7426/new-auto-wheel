"use server"
import { fetchAPI } from '@/services/fetchAPI';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

export const fetchMakesByTypeServer = async (type) => {
  try {
    const makes = await await fetchAPI(`${API_ENDPOINTS.MAKES}?type=${type}`);
    return makes;
  } catch (error) {
    return {
      makes: [],
    };
  }
};


export const postDataToServer = async (url, payload) => {
  try {


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





export const fetchBrowseBlogsServer = async (type) => {
  try {
    const blogs = await await fetchAPI(`${API_ENDPOINTS.BROWSE_BLOGS}${type?`?type=${type}`:''}`);
    return blogs?.data;
  } catch (error) {
    return {
      blogs: [],
    };
  }
};
export const fetchVideoDataServer = async (params) => {
  try {
    const videos = await await fetchAPI(`${API_ENDPOINTS.BROWSE_VIDEOS}${params?.slug?`?slug=${params?.slug}`:''}${params?.search?`?search=${params?.search}`:''}`);
    return videos?.data;
  } catch (error) {
    return {
      videos: [],
    };
  }
};





