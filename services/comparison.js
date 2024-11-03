import { fetchAPI } from "./fetchAPI";
import { API_ENDPOINTS } from "@/constants/api-endpoints";

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
