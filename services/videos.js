import { fetchAPI } from './fetchAPI';
import { API_ENDPOINTS } from '../constants/api-endpoints';

export const fetchVideosPageData = async (params) => {
  try {
    const path = Array.isArray(params?.slug) && params.slug.length > 0 
    ? params.slug.map(item => item).join('/') 
    : '';
console.log("shan<<>>>>>",`${API_ENDPOINTS.VIDEOS.LIST}${path}`)
    const videos = await fetchAPI(`${API_ENDPOINTS.VIDEOS.LIST}${path}`);
    return videos
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return {
    videos:[]
    };
  }
};