import { api } from './api';

export const vehiclesService = {
  getUserVehicles: async (userId, params) => {

    return api.get(`api/user/vehicles-by-user/${userId}`, params);
  },


  getUserFavoriteVehicles: async (userId, params) => {

    return api.get(`api/user/${userId}/favorites`, params);
  },

  deleteFavoriteVehicle: async (userId,vehicleId) => {

    return api.put(`api/user/favorites/${userId}/${vehicleId}`);
  },

  // Add other vehicle-related API calls here
};

    // 3032803423