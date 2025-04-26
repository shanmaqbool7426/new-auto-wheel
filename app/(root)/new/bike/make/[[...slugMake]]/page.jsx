import React from "react";
import MakesVehicles from "@/modules/make-vehicles/index";
import {
  fetchListData,
  fetchMakesAndBodies,
} from "@/services/vehicles";
import { API_ENDPOINTS } from "@/constants/api-endpoints";

const NewCarsPage = async (params, searchParams) => {
  // Extract slug values
  const [slugMake] = params.params.slugMake;
  const vehicleType="bike";
  
  // Fetch initial data
  const makesAndBodies = await fetchMakesAndBodies(vehicleType);

  // Fetch vehicle-related data
  const popularVehicles = await fetchListData(
    API_ENDPOINTS.NEW_VEHICLE.MAKES_WITH_POPULAR(slugMake, null, vehicleType)
  );
  
  const upcomingVehicles = await fetchListData(
    API_ENDPOINTS.NEW_VEHICLE.UPCOMMING(slugMake, null, vehicleType)
  );
  
  const newlyLaunchedVehicles = await fetchListData(
    API_ENDPOINTS.NEW_VEHICLE.NEWLY_LAUNCHED_VEHICLES(slugMake, null, vehicleType)
  );
  
  const makeVehicles = await fetchListData(
    API_ENDPOINTS.NEW_VEHICLE.MAKE_BY_VEHICLES(slugMake, null, vehicleType)
  );
  
  const makesByTypeData = await fetchListData(
    `${API_ENDPOINTS.BROWSE.BY_MAKE}?type=${vehicleType}`
  );

  return (
    <>
      <MakesVehicles
        makes={makesAndBodies?.makes}
        bodies={makesAndBodies?.bodies}
        slugMake={slugMake}
        vehicleType={vehicleType}
        params={params}
        popularVehicles={popularVehicles}
        upcomingVehicles={upcomingVehicles}
        newlyLaunchedVehicles={newlyLaunchedVehicles}
        makeVehicles={makeVehicles}
        makesByTypeData={makesByTypeData}
      />
    </>
  );
};

export default NewCarsPage;
