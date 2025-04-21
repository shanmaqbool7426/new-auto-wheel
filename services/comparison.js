import axios from 'axios';
import { apiClient } from '@/lib/api-client';
import { API_ENDPOINTS, BASE_URL } from "@/constants/api-endpoints";

export const Comparison = async (data) => {
  try {
    const {params, type} = data;
    // Decode the single slug
    const slug = decodeURIComponent(params.params.slug);
    // Split the slug into individual vehicle strings
    const vehicleDetails = slug.split('_').map((vehicleStr) => {
      const [make, model, ...variantParts] = vehicleStr.split('-');
      // Only include variant if it exists and has content
      let variant = variantParts.length > 0 ? variantParts.join('-') : undefined;
      
      // If variant exists, replace dashes with spaces
      if (variant) {
        variant = variant.replace(/-/g, ' ');
      }
      
      // Create vehicle object with conditionally added variant
      const vehicle = { make, model };
      if (variant) {
        vehicle.variant = variant;
        vehicle.matchOnVariant = true; // Flag to indicate full matching
      } else {
        vehicle.matchOnVariant = false; // Flag to indicate match only on make/model
      }
      
      return vehicle;
    });
    
    const payload = {
      vehicle1: vehicleDetails[0] || null,
      vehicle2: vehicleDetails[1] || null,
      vehicle3: vehicleDetails[2] || null,
      // Include matching preference in the payload
      matchingPreference: vehicleDetails.map(v => v?.matchOnVariant || false)
    };
    
    console.log("vehicleDetails......", JSON.stringify(payload));

    // Use axios with caching
    const url = `${API_ENDPOINTS.NEW_VEHICLE.COMPARISON}?type=${encodeURIComponent(type)}`;
    const response = await axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    return response.data;
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

    // Use apiClient which is an axios instance
    const response = await apiClient.get(`/api/comparison/top?${queryParams}`, {
      headers: {
        'Cache-Control': 'max-age=600', // Cache for 10 minutes
      }
    });
    
    return response.data.data;
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

