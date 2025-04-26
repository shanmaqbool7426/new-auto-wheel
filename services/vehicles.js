import { fetchAPI } from "./fetchAPI";
import { API_ENDPOINTS, LOCATION_PROVINCES } from "@/constants/api-endpoints";

export const fetchVehiclsData = async (params) => {
  try {


    let vehicleType = 'car'; // Default vehicle type
    let filterParams = [];

    // Handle server-side case where params are passed directly
    if (params && Array.isArray(params)) {
      // The first element might be the vehicle type
      const firstParam = params[0];
      
      if (typeof firstParam === 'string') {
        // Extract vehicle type from string patterns
        if (firstParam.includes('used-bikes')) {
          vehicleType = 't_bike';
        } else if (firstParam.includes('used-trucks')) {
          vehicleType = 't_truck';
        } else if (firstParam.includes('used-cars')) {
          vehicleType = 't_car';
        } else if (firstParam.startsWith('used-')) {
          // Extract from pattern like 'used-X' where X is the vehicle type
          vehicleType = firstParam
            .replace('used-', '')
            .replace(/s$/, '');
        }
        
        // Only use remaining params for filtering
        filterParams = params.slice(1);
      } else {
        // No vehicle type in params, use all for filtering
        filterParams = params;
      }
    }

    // Safe client-side detection
    if (typeof window !== 'undefined') {
      try {
        const pathname = window.location.pathname.toLowerCase();
        // Override vehicle type if clear from URL
        if (pathname.includes('used-bikes')) {
          vehicleType = 't_bike';
        } else if (pathname.includes('used-trucks')) {
          vehicleType = 't_truck';
        } else if (pathname.includes('used-cars')) {
          vehicleType = 't_car';
        }
      } catch (e) {
        // Safely handle any window errors
        console.error("Error accessing window:", e);
      }
    }

    // Filter out any undefined or empty parameters
    const validParams = filterParams.filter(param => param && param !== 'undefined' && param !== 't_undefined');

    // Construct the final URL
    const baseUrl = `${API_ENDPOINTS.VEHICLE.LISTINGS}/${vehicleType}`;
    const finalUrl = validParams.length > 0 
      ? `${baseUrl}/${validParams.join('/')}`
      : baseUrl;


    // Add caching strategy
    const vehicles = await fetchAPI(
      finalUrl,
      {
        next: { revalidate: 60 } // Cache for 1 minute
      }
    );
    return vehicles;
  } catch (error) {
    console.error("Error fetching vehicles data:", error);
    return {
      vehicls: [],
    };
  }
};

export const fetchNewVehiclsData = async (params) => {
  try {
    const vehicles = await fetchAPI(API_ENDPOINTS.NEW_VEHICLE.LISTINGS + `/${params}`);
    return vehicles
  } catch (error) {
    return {
      vehicls: [],
    };
  }
};

export const fetchListData = async (url) => {
  try {
    // Handle edge case where URL might be undefined
    if (!url) {
      return { data: [] };
    }
    
    const data = await fetchAPI(url);
    return data;
  } catch (error) {
    console.error("Error fetching list data:", error);
    return {
      data: [],
    };
  }
};

export const fetchMakesByType = async (params) => {
  try {
    const makes = await fetchAPI(
      `${API_ENDPOINTS.BROWSE.BY_MAKE}?type=${params}`
    );
    return makes;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return {
      makes: [],
    };
  }
};
export const fetchBodiesByType = async (type) => {
  try {
    const bodiesByType = await fetchAPI(
      `${API_ENDPOINTS.BROWSE.BY_BODY}/${type}`
    );
    return bodiesByType;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return {
      bodiesByType: [],
    };
  }
};



export const fetchVehiclesByType = async (type) => {
  try {
    const vehicles = await fetchAPI(
      API_ENDPOINTS.VEHICLE.LIST_BY_TYPE(type ? type : "")
    );
    return vehicles;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return {
      vehicles: [],
    };
  }
};


export const fetchProvincesData = async (type) => {
  try {
    const provinces = await fetchAPI(LOCATION_PROVINCES);
    return provinces;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return {
      provinces: [],
    };
  }
};

export const fetchVehiclDetail = async (url) => {
  try {
    const vehicl = await fetchAPI(url);
    return vehicl;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return {
      vehicls: [],
    };
  }
};
// new vehicle detail get
export const fetchNewVehicleDetail = async (url) => {
  try {
    const vehicl = await fetchAPI(url);
    return vehicl;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
  }
};

export const fetchSimilarVehicles = async (url) => {
  try {
    const similarvehicles = await fetchAPI(url);
    return similarvehicles;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return {
      similarvehicles: [],
    };
  }
};




export const fetchVehicleBySlug = async (params) => {
  try {
    const vehicle = await fetchAPI(
      API_ENDPOINTS.VEHICLE.DETAIL(params.params.slug[0])
    );
    return vehicle;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return {
      vehicle: {},
    };
  }
};

export const fetchMakesAndBodies = async (params) => {
  const results = await Promise.allSettled([
    fetchAPI(`${API_ENDPOINTS.BROWSE.BY_MAKE}?type=${params}`), // Fetch makes by type
    fetchAPI(`${API_ENDPOINTS.BROWSE.BY_BODY}/${params}`), // Fetch bodies by type
  ]);

  const data = {
    makes: results[0].status === "fulfilled" ? results[0].value : [],
    bodies: results[1].status === "fulfilled" ? results[1].value : [],
  };
  results.forEach((result, index) => {
    if (result.status === "rejected") {
      console.error(
        `Error fetching ${Object.keys(data)[index]}:`,
        result.reason
      );
    }
  });
  return data;
};

export const fetchVehiclesNew = async (url) => {
  try {
    const vehicls = await fetchAPI(url);
    return vehicls;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return {
      vehicls: [],
    };
  }
};

export const getAllReviews = async (filterType = "all", type) => {
  try {
    const getAllReviews = await fetchAPI(
      `${API_ENDPOINTS.REVIEWS.GET_ALL}?filterType=${filterType}&type=${type}`
    );
    return getAllReviews?.data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return {
      getAllReviews: [11],
    };
  }
};

export const fetchVehicleDrives = async (type) => {
  try {
    const drives = await fetchAPI(API_ENDPOINTS.DRIVE.GET(type));
    return drives;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return {
      drives: [],
    };
  }
};

export const fetchVehicleTransmissions = async (type) => {
  try {
    const transmissions = await fetchAPI(API_ENDPOINTS.TRANSMISSION.GET(type));
    return transmissions;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return {
      transmissions: [],
    };
  }
};

export const fetchVehicleFuelTypes = async (type) => {
  try {
    const fuelTypes = await fetchAPI(API_ENDPOINTS.FUEL_TYPE.GET(type));
    return fuelTypes;
  } catch (error) { 
    console.error("Error fetching dashboard data:", error);
    return {
      fuelTypes: [],
    };
  }
};

export const fetchVehicleColors = async (type) => {
  try {
    const colors = await fetchAPI(API_ENDPOINTS.COLOR.GET(type));
    return colors;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return {
      colors: [],
    };
  }
};

export const fetchVehicleCompetitors = async (vehicleId) => {
  try {
    const competitors = await fetchAPI(API_ENDPOINTS.COMPETITOR.GET(vehicleId));

    return competitors?.data || [];
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return [];
  }
};


