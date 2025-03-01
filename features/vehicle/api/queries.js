import { apiClient } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

export const vehicleApi = {
  // Vehicle Listings
  getVehiclesByType: async (type) => {
    const { data } = await apiClient.get(API_ENDPOINTS.VEHICLE.LIST_BY_TYPE(type));
    return data;
  },

  getVehiclesListing: async (filters) => {
    const { data } = await apiClient.get(API_ENDPOINTS.VEHICLE.LISTINGS, { params: filters });
    return data;
  },

  getVehicleDetail: async (id) => {
    const { data } = await apiClient.get(API_ENDPOINTS.VEHICLE.DETAIL(id));
    return data;
  },

  addVehicle: async (vehicleData) => {
    const { data } = await apiClient.post(API_ENDPOINTS.VEHICLE.ADD, vehicleData);
    return data;
  },

  getSimilarVehicles: async (id) => {
    const { data } = await apiClient.get(API_ENDPOINTS.VEHICLE.SIMILAR, { params: { id } });
    return data;
  },

  getFavoriteVehicles: async (userId, filters) => {
    const { data } = await apiClient.get(`${API_ENDPOINTS.VEHICLE.BASE}/favorites/${userId}`, {
      params: filters
    });
    return data;
  },

  addToFavorites: async (userId, vehicleId) => {
    const { data } = await apiClient.post(`${API_ENDPOINTS.VEHICLE.BASE}/favorites/${userId}`, {
      vehicleId
    });
    return data;
  },

  deleteFavoriteVehicle: async (userId, vehicleId) => {
    const { data } = await apiClient.delete(`${API_ENDPOINTS.VEHICLE.BASE}/favorites/${userId}/${vehicleId}`);
    return data;
  },

  // Browse
  getBrowseByMake: async () => {
    const { data } = await apiClient.get(API_ENDPOINTS.BROWSE.BY_MAKE);
    return data;
  },

  getMakesWithPopular: async (make, type) => {
    const { data } = await apiClient.get(API_ENDPOINTS.BROWSE.MAKES_WITH_POPULAR(make, type));
    return data;
  },

  getBrowseByBody: async () => {
    const { data } = await apiClient.get(API_ENDPOINTS.BROWSE.BY_BODY);
    return data;
  },
};