import { apiClient } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

export const blogApi = {
  // Get Blog Listings
  getBlogs: async (filters = {}) => {
    const { data } = await apiClient.get(API_ENDPOINTS.BLOGS.LIST, {
      params: filters
    });
    return data;
  },

  // Get Browse Blogs
  getBrowseBlogs: async (type) => {
    const { data } = await apiClient.get(API_ENDPOINTS.BLOGS.BROWSE, {
      params: { type }
    });
    return data;
  },

  // Search Blogs
  searchBlogs: async (query) => {
    const { data } = await apiClient.get(API_ENDPOINTS.BLOGS.SEARCH, {
      params: { query }
    });
    return data;
  },

  // Get Blog Detail
  getBlogDetail: async (id) => {
    const { data } = await apiClient.get(`${API_ENDPOINTS.BLOGS.LIST}${id}`);
    return data;
  },

  // Add Comment to Blog
  addComment: async ({ blogId, comment }) => {
    const { data } = await apiClient.post(API_ENDPOINTS.COMMENTS.BASE, {
      blogId,
      comment
    });
    return data;
  },

  // Get Blog Comments
  getBlogComments: async (blogId) => {
    const { data } = await apiClient.get(`${API_ENDPOINTS.COMMENTS.BASE}/${blogId}`);
    return data;
  },

  // Delete Comment (if needed)
  deleteComment: async (commentId) => {
    const { data } = await apiClient.delete(`${API_ENDPOINTS.COMMENTS.BASE}/${commentId}`);
    return data;
  }
};