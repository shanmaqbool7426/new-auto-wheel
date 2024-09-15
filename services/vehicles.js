import { fetchAPI } from './fetchAPI';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

export const fetchVehiclsData = async (params) => {
  try {
    const vehicles = await fetchAPI(API_ENDPOINTS.VEHICLE.LISTINGS + `/${params}`);
    return vehicls
  } catch (error) {
    console.log('vehicls>>>', error)

    return {
      vehicls: []
    };
  }
};


export const fetchListData = async (url) => {
  try {
    console.log('url>>>>>>>>>>111', url);
    const data = await fetchAPI(url)
    console.log('url>>>>>>>>>>111 result', url);

    return data
  } catch (error) {
    console.log('url>>>>>>>>>>111 result', error)

    return {
      data: []
    };
  }
};

export const fetchMakesByType = async (type) => {
  try {
    const makes = await fetchAPI(`${API_ENDPOINTS.BROWSE.BY_MAKE}?type=${params}`);
    return makes
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return {
      makes: []
    };
  }
}
export const fetchBodiesByType = async (type) => {
  try {
    const bodiesByType = await fetchAPI(`${API_ENDPOINTS.BROWSE.BY_BODY}/${type}`);
    return bodiesByType
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return {
      bodiesByType: []
    };
  }
}

export const fetchVehiclesByType = async (type) => {
  try {
    const vehicles = await fetchAPI(API_ENDPOINTS.VEHICLE.LIST_BY_TYPE(type ? type : ''));
    return vehicles
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return {
      vehicles: []
    };
  }
}

export const fetchVehiclDetail = async (url) => {
  try {
    console.log('vehicl>>>', url)
    const vehicl = await fetchAPI(url)
    return vehicl
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return {
      vehicls: []
    };
  }
};

export const fetchVehicleBySlug = async (params) => {
  try {
    console.log(params.params.slug[0], 'sjdhsjdhsj');
    const vehicle = await fetchAPI(API_ENDPOINTS.VEHICLE.DETAIL(params.params.slug[0]));
    return vehicle
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return {
      vehicle: {}
    };
  }
};

export const fetchMakesAndBodies = async (params) => {
  const results = await Promise.allSettled([
    fetchAPI(`${API_ENDPOINTS.BROWSE.BY_MAKE}?type=${params}`),  // Fetch makes by type
    fetchAPI(`${API_ENDPOINTS.BROWSE.BY_BODY}/${params}`)         // Fetch bodies by type
  ]);
  
  const data = {
    makes: results[0].status === 'fulfilled' ? results[0].value : [],
    bodies: results[1].status === 'fulfilled' ? results[1].value : [],
  };
  console.log('data results', data);
  results.forEach((result, index) => {
    if (result.status === 'rejected') {
      console.error(`Error fetching ${Object.keys(data)[index]}:`, result.reason);
    }
  });
  return data;
};

export const fetchVehiclesNew = async (url) => {
  try {
    const vehicls = await fetchAPI(url)
    return vehicls
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return {
      vehicls: []
    };
  }
}


export const getAllReviews = async (filterType = 'all') => {
  try {

    const getAllReviews = await fetchAPI(`${API_ENDPOINTS.REVIEWS.GET_ALL}?filterType=${filterType}`);
    console.log('.......', getAllReviews)
    return getAllReviews?.data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return {
      getAllReviews: [11],
    };
  }
};


