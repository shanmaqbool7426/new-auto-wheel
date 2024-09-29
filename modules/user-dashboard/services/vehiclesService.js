import { api } from './api';

export const vehiclesService = {
  getUserVehicles: async (userId, params) => {

    console.log('chlaaa')
    return api.get(`api/user/vehicles-by-user/${userId}`, params);
  },
  // Add other vehicle-related API calls here
};

    // 3032803423