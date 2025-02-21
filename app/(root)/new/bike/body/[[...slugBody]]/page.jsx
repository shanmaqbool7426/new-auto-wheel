import React from "react";
import BodiesVehicles from "@/modules/body-vehicles/index";
import {
  fetchListData,
  fetchMakesAndBodies,
} from "@/services/vehicles";
import { API_ENDPOINTS } from "@/constants/api-endpoints";

const NewBikesPage = async (params) => {
  // Extract slug values
  const [slugBody] = params.params.slugBody;
  const vehicleType="bike";
  // Fetch initial data
  const makesAndBodies = await fetchMakesAndBodies(vehicleType);

  // Fetch vehicle-related data
  const popularVehicles = await fetchListData(
    API_ENDPOINTS.NEW_VEHICLE.MAKES_WITH_POPULAR(null, vehicleType,slugBody)
  );
  const fetchUpComingVehicles = await fetchListData(
    API_ENDPOINTS.NEW_VEHICLE.UPCOMMING(null, vehicleType,slugBody)
  );
  const fetchNewlyLaunchedVehicles = await fetchListData(
    API_ENDPOINTS.NEW_VEHICLE.NEWLY_LAUNCHED_VEHICLES(null, vehicleType,slugBody)
  );


  // Determine if we should display 'MakesVehicles' or 'NewCarsModule'
  const matchedBody = makesAndBodies?.bodies?.data?.find(
    (body) => body?.title?.toLowerCase() === slugBody?.toLowerCase()
  );
  const altraNativesBody = makesAndBodies?.bodies?.data?.filter(
    (body) => body?.title?.toLowerCase() !== slugBody?.toLowerCase()
  );
  return (
    <>
        <BodiesVehicles
          popularVehicles={popularVehicles}
          fetchUpComingVehicles={fetchUpComingVehicles}
          fetchNewlyLaunchedVehicles={fetchNewlyLaunchedVehicles}
          slugBody={slugBody}
          matchedBody={matchedBody}
          altraNativesBody={altraNativesBody}
          vehicleType={vehicleType}
        />
    </>
  );
};

export default NewBikesPage;
