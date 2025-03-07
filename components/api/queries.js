
import { apiClient } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

export const locationApi = {
  // Get provinces
  getProvinces: async () => {
    const { data } = await apiClient.get(API_ENDPOINTS.LOCATION_PROVINCES);
    return data;
  },

  // Get Browse Blogs
//   getBrowseBlogs: async (type) => {
//     const { data } = await apiClient.get(API_ENDPOINTS.BLOGS.BROWSE, {
//       params: { type }
//     });
//     return data;
//   },
};