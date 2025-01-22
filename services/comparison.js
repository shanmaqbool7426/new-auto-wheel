import { fetchAPI } from "./fetchAPI";
import { API_ENDPOINTS, BASE_URL } from "@/constants/api-endpoints";

export const Comparison = async (data) => {
  try {
    const {params,type } = data;
    // Decode the single slug
    // const slug = decodeURIComponent(params.slug);
    const slug = decodeURIComponent(params.params.slug);
    console.log(params.params.slug,type)
    // Split the slug into individual vehicle strings
    const vehicleDetails = slug.split('_').map((vehicleStr) => {
      const [make, model, ...variantParts] = vehicleStr.split('-');
      const variant = variantParts.length > 0 ? variantParts.join('-') : undefined;
      
      // Ensure only make and model are required, and include variant if it exists
      return { make, model, ...(variant ? { variant } : {}) };
    });
    const payload=JSON.stringify({
      vehicle1: vehicleDetails[0] || null,
      vehicle2: vehicleDetails[1] || null,
      vehicle3: vehicleDetails[2] || null,
    })
    console.log(payload)

    // Send the payload to the backend API
    const response = await fetch(`${API_ENDPOINTS.NEW_VEHICLE.COMPARISON}`+ `?type=${encodeURIComponent(type)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: payload,
    });

    return response.json();
  } catch (error) {
    console.error("Error fetching comparison data:", error);
    return {
      comparison: [],
    };
  }
};

// Get all comparisons
export const getCompares = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams({
      page: params.page || 1,
      limit: params.limit || 10,
      ...(params.type && { type: params.type }),
      ...(params.search && { search: params.search })
    }).toString();


    console.log(BASE_URL,"API_ENDPOINTS.COMPARISON.GET_COMPARISON_SETS")
    const response = await fetch(
      `${BASE_URL}/api/comparison/list?${queryParams}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );


    if (!response.ok) {
      throw new Error('Failed to fetch comparisons');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching comparisons:', error);
    return {
      comparisons: [],
      pagination: {
        total: 0,
        page: 1,
        pages: 1,
        limit: 10
      }
    };
  }
};

