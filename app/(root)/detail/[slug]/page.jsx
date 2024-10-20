import React, { Suspense } from "react";
import VehicleDetailModule from "@/modules/vehicle-detail";
import { fetchSimilarVehicles, fetchVehiclDetail } from "@/services/vehicles";
import { API_ENDPOINTS } from "@/constants/api-endpoints";

const VehicleDetailPage = async ({ params }) => {
  const slug = params?.slug ?? "#";

  // Fetch vehicle details
  const detail = await fetchVehiclDetail(
    API_ENDPOINTS.VEHICLE.DETAIL(slug)
  );
  const similar = await fetchSimilarVehicles(
    `${API_ENDPOINTS.VEHICLE.SIMILAR}/${detail?.data?._id}`

  );
  
  return (
    <Suspense fallback={<div>Loading vehicle details...</div>}>
      <VehicleDetailModule detail={detail} listOfSimilarVehicles={similar} />
    </Suspense>
  );
};

export default VehicleDetailPage;
