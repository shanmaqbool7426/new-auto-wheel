import { fetchAPI } from "./fetchAPI";
import { API_ENDPOINTS, LOCATION_PROVINCES } from "@/constants/api-endpoints";

export const fetchVehiclsData = async (params) => {
  try {
    // Extract vehicle type from URL
    const urlParts = typeof window !== 'undefined' ? window.location.pathname.split('/') : [];
    let vehicleType = 'car';

    if (urlParts[1]?.startsWith('used-')) {
      // Remove 'used-' prefix and ensure we don't have double 's'
      vehicleType = urlParts[1]
        .replace('used-', '')  // Remove 'used-' prefix
        .replace(/s+$/, '');   // Remove any trailing 's' characters
    }

    // Filter out any undefined or invalid params
    const validParams = Array.isArray(params) 
      ? params.filter(p => p && p !== 'undefined' && p !== 't_undefined')
      : [];

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
    const data = await fetchAPI(url);

    return data;
  } catch (error) {
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
    console.log("competitors.......",API_ENDPOINTS.COMPETITOR.GET(vehicleId))
    const competitors = await fetchAPI(API_ENDPOINTS.COMPETITOR.GET(vehicleId));

    return competitors?.data || [];
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return [];
  }
};


