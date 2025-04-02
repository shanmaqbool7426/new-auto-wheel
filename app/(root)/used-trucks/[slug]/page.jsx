import React, { Suspense } from "react";
import VehicleDetailModule from "@/modules/vehicle-detail";
import LoadingWrapper from "@/components/loading-wrapper";
import { Center, Loader } from '@mantine/core';
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
    <LoadingWrapper>
      <Suspense 
        fallback={
          <Center h="100vh">
            <Loader color="red" size="lg" />
          </Center>
        }
      >
        <VehicleDetailModule 
          detail={detail} 
          listOfSimilarVehicles={similar} 
        />
      </Suspense>
    </LoadingWrapper>
  );
};

export default VehicleDetailPage;
