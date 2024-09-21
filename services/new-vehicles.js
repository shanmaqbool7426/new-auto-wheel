import { fetchAPI } from './fetchAPI';

export const fetchVehicleBySlug = async (url) => {
    try {
      const vehicle = await fetchAPI(url)
      return vehicle
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      return {
        vehicle: {}
      };
    }
  };