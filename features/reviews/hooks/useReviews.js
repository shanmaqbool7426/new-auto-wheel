import { apiClient } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

export const reviewApi = {
  // User Reviews
  getUserReviews: async (dealerId, filters = {}) => {
    const { data } = await apiClient.get(
      `${API_ENDPOINTS.USER_REVIEWS.GET_USER_REVIEWS_BY_DEALER_ID}/${dealerId}`,
      { params: filters }
    );
    return data;
  },

  // Vehicle Reviews
  getVehicleReviews: async (vehicleId) => {
    const { data } = await apiClient.get(
      `${API_ENDPOINTS.REVIEWS.REVIEWS_BY_VEHICLE}/${vehicleId}`
    );
    return data;
  },

  // Overall Ratings
  getVehicleOverallRatings: async (vehicleId) => {
    const { data } = await apiClient.get(
      `${API_ENDPOINTS.REVIEWS.REVIEWS_BY_VEHICLE_OVERALL}/${vehicleId}`
    );
    return data;
  },

  // Submit Review
  submitReview: async (reviewData) => {
    const { data } = await apiClient.post(API_ENDPOINTS.REVIEWS.SUBMIT, reviewData);
    return data;
  },

  // Get All Reviews
  getAllReviews: async (filters = {}) => {
    const { data } = await apiClient.get(API_ENDPOINTS.REVIEWS.GET_ALL, {
      params: filters
    });
    return data;
  },

  // Delete Review (if needed)
  deleteReview: async (reviewId) => {
    const { data } = await apiClient.delete(`${API_ENDPOINTS.REVIEWS.BASE}/${reviewId}`);
    return data;
  },

  // Update Review (if needed)
  updateReview: async (reviewId, reviewData) => {
    const { data } = await apiClient.put(
      `${API_ENDPOINTS.REVIEWS.BASE}/${reviewId}`,
      reviewData
    );
    return data;
  }
};