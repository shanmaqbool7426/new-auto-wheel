import React from "react";
import { fetchListData } from "@/services/vehicles";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import CarReviewsModule from "@/modules/car-reviews/index";
import CompareModule from "@/modules/compareModule";

// Helper function to standardize vehicle names
const standardizeVehicleName = (make, model) => {
  return `${make} ${model}`.toLowerCase().replace(/\s+/g, "-");
};

// Helper function to extract make and model from standardized slug
const extractMakeAndModel = (slug) => {
  const parts = slug.split("-");
  const make = parts[0];
  const model = parts.slice(1).join(" ");
  return { make, model };
};

const CarReviews = async ({ params }) => {
  // Fetch make data (this doesn't depend on slug, so we can always fetch it)
  const fetchMakesByTypeData = await fetchListData(
    `${API_ENDPOINTS.BROWSE.BY_MAKE}?type=car`
  );

  // Fetch popular vehicles data (these don't depend on slug either)
  const popularVehicles = await fetchListData(
    API_ENDPOINTS.NEW_VEHICLE.MAKES_WITH_POPULAR(undefined, "car")
  );

  const popularUsedVehicles = await fetchListData(
    API_ENDPOINTS.VEHICLE.MAKES_WITH_POPULAR(undefined, "car")
  );

  // Initialize variables for slug-dependent data
  let reviewsVehicles = null;
  let reviewsVehiclesOverAll = null;
  let make = null;
  let model = null;
  let variants = [];

  // Check if slug is available
  if (params.slug && params.slug.length > 0) {
    const standardizedSlug = params.slug[0];

    if (standardizedSlug) {
      // Extract make and model from the standardized slug
      ({ make, model } = extractMakeAndModel(standardizedSlug));

      if (make && model) {
        try {
          // Use the standardized vehicle name for API calls
          const standardizedVehicle = standardizeVehicleName(make, model);
          reviewsVehicles = await fetchListData(
            `${API_ENDPOINTS.REVIEWS.REVIEWS_BY_VEHICLE}/${standardizedVehicle}`
          );
          reviewsVehiclesOverAll = await fetchListData(
            `${API_ENDPOINTS.REVIEWS.REVIEWS_BY_VEHICLE_OVERALL}/${standardizedVehicle}`
          );

          // Find the correct make in the fetchMakesByTypeData
          const makeData = fetchMakesByTypeData.data.find(
            (item) => item.name.toLowerCase() === make.toLowerCase()
          );

          if (makeData) {
            // Find the correct model in the make's models array
            const modelData = makeData.models.find(
              (item) => item.name.toLowerCase() === model.toLowerCase()
            );

            if (modelData) {
              // Get the variants for this specific model
              variants = modelData.variants;
            }
          }
        } catch (error) {
          console.error("Error fetching review data:", error);
          // You might want to set an error state here or handle it in some way
        }
      }
    }
  }


  return (
    <>
    {/* make && model && reviewsVehicles && reviewsVehiclesOverAll */}
      {make && model && reviewsVehicles && reviewsVehiclesOverAll ? (
        <CompareModule
          reviewsVehicles={reviewsVehicles}
          reviewsVehiclesOverAll={reviewsVehiclesOverAll}
          make={make}
          model={model}
          fetchMakesByTypeData={fetchMakesByTypeData}
          variants={variants}
          type={"car"}
        />
      ) : (
        <CarReviewsModule
          fetchMakesByTypeData={fetchMakesByTypeData}
          popularVehicles={popularVehicles}
          popularUsedVehicles={popularUsedVehicles}
          type={"car"}
        />
      )}
    </>
  );
};

export default CarReviews;
