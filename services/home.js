import { fetchAPI } from "./fetchAPI";
import { API_ENDPOINTS } from "@/constants/api-endpoints";

export const fetcHomeData = async () => {
  const results = await Promise.allSettled([
    fetchAPI(`${API_ENDPOINTS.BROWSE.BY_MAKE}?type=car`),

    fetchAPI(`${API_ENDPOINTS.BROWSE.BY_BODY}/car`),

    fetchAPI(API_ENDPOINTS.VEHICLE.LIST_BY_TYPE()),

    fetchAPI(API_ENDPOINTS.EXTERNAL.COMPARISONS),

    fetchAPI(API_ENDPOINTS.EXTERNAL.INSTANT_USED_CARS),

    fetchAPI(API_ENDPOINTS.VIDEOS.BROWSE),

    fetchAPI(API_ENDPOINTS.BLOGS.BROWSE),
  ]);

  const data = {
    makes: results[0].status === "fulfilled" ? results[0].value : [],
    bodies: results[1].status === "fulfilled" ? results[1].value : [],
    vehiclesTypes: results[2].status === "fulfilled" ? results[2].value : [],
    comparisons: results[3].status === "fulfilled" ? results[3].value : [],
    instantUsedCars: results[4].status === "fulfilled" ? results[4].value : [],
    videos: results[5].status === "fulfilled" ? results[5].value : [],
    blogs: results[6].status === "fulfilled" ? results[6].value : [],
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
