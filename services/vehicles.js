import { fetchAPI } from "./fetchAPI";
import { API_ENDPOINTS } from "@/constants/api-endpoints";

export const fetchVehiclsData = async (params) => {
  try {
    console.log(">>>>>>>>>>.",API_ENDPOINTS.VEHICLE.LISTINGS + `/${params}`)
    const vehicles = await fetchAPI(API_ENDPOINTS.VEHICLE.LISTINGS + `/${params}`);
    return vehicles
  } catch (error) {
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

export const getAllReviews = async (filterType = "all") => {
  try {
    const getAllReviews = await fetchAPI(
      `${API_ENDPOINTS.REVIEWS.GET_ALL}?filterType=${filterType}`
    );
    return getAllReviews?.data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return {
      getAllReviews: [11],
    };
  }
};
