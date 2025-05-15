import { fetchAPI } from "./fetchAPI";
import { API_ENDPOINTS } from "@/constants/api-endpoints";

// Cache duration in milliseconds (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

// Cache object to store API responses
const cache = new Map();

// Helper function to get cached data
const getCachedData = (key) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
};

// Helper function to set cached data
const setCachedData = (key, data) => {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  });
};

export const fetcHomeData = async () => {
  // Check cache first
  const cachedData = getCachedData('homeData');
  if (cachedData) {
    return cachedData;
  }

  try {
    const results = await Promise.allSettled([
      fetchAPI(`${API_ENDPOINTS.BROWSE.BY_MAKE}?type=car`),
      fetchAPI(`${API_ENDPOINTS.BROWSE.BY_BODY}/car`),
      fetchAPI(API_ENDPOINTS.VEHICLE.LIST_BY_TYPE()),
      fetchAPI(API_ENDPOINTS.EXTERNAL.COMPARISONS),
      fetchAPI(API_ENDPOINTS.EXTERNAL.INSTANT_USED_CARS),
      fetchAPI(API_ENDPOINTS.VIDEOS.BROWSE),
    ]);

    const dataKeys = [
      'makes',
      'bodies',
      'vehiclesTypes',
      'comparisons',
      'instantUsedCars',
      'videos',
    ];

    const data = dataKeys.reduce((acc, key, index) => ({
      ...acc,
      [key]: results[index]?.status === "fulfilled" ? results[index].value : []
    }), {});

    // Log errors for failed requests
    results.forEach((result, index) => {
      if (result.status === "rejected") {
        console.error(
          `Error fetching ${Object.keys(data)[index]}:`,
          result.reason
        );
      }
    });

    // Cache the successful response
    setCachedData('homeData', data);
    return data;
  } catch (error) {
    console.error('Error fetching home data:', error);
    return {};
  }
};

export const fetchBanner = async () => {
  // Check cache first
  const cachedBanner = getCachedData('banner');
  if (cachedBanner) {
    return cachedBanner;
  }

  try {
    const res = await fetchAPI(API_ENDPOINTS.BANNER);
    // Cache the successful response
    setCachedData('banner', res);
    return res;
  } catch (error) {
    console.error('Error fetching banner:', error);
    return null;
  }
};
