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

   

  ]);




// ... existing code ...

const dataKeys = [
  'makes',
  'bodies',
  'vehiclesTypes',
  'comparisons',
  'instantUsedCars',
  'videos',
  'blogs'
];

const data = dataKeys.reduce((acc, key, index) => ({
  ...acc,
  [key]: results[index]?.status === "fulfilled" ? results[index].value : []
}), {});

// ... existing code ...

  console.log("maaaaa",data?.banner);
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

export const fetchBanner = async () => {
  const res = await fetchAPI(API_ENDPOINTS.BANNER);
  return res;
};
