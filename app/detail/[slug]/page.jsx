import React, { Suspense } from "react";
import VehicleDetailModule from "@/modules/vehicle-detail";
import { fetchVehiclDetail } from "@/services/vehicles";
import { API_ENDPOINTS } from "@/constants/api-endpoints";

const VehicleDetailPage = async ({ params }) => {
  const slug = params?.slug ?? "#";

  // Fetch vehicle details
  const detail = await fetchVehiclDetail(
    `${API_ENDPOINTS.VEHICLE_DETAIL}/${slug}`
  );

  return (
    <Suspense fallback={<div>Loading vehicle details...</div>}>
      <VehicleDetailModule detail={detail} listOfSimilarVehicles={[]} />
    </Suspense>
  );
};

export default VehicleDetailPage;
