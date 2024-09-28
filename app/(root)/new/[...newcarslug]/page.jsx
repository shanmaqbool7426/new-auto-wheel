import React from 'react';
import NewCarsModule from "@/modules/new-cars/index";
import MakesVehicles from "@/modules/make-vehicles/index";
import { 
  fetchListData, 
  fetchMakesAndBodies, 
  fetchMakesByType, 
  fetchVehiclsData 
} from '@/services/vehicles';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

const NewCarsPage = async (params, searchParams) => {
  // Extract slug values
  const [vehicleType, slugMake] = params.params.newcarslug;

  // Fetch initial data
  const makesAndBodies = await fetchMakesAndBodies(vehicleType);

  // Fetch vehicle-related data
  const popularVehicles = await fetchListData(
    API_ENDPOINTS.NEW_VEHICLE.MAKES_WITH_POPULAR(slugMake, vehicleType)
  );
  const fetchUpComingVehicles = await fetchListData(
    API_ENDPOINTS.NEW_VEHICLE.UPCOMMING(slugMake, vehicleType)
  );
  const fetchNewlyLaunchedVehicles = await fetchListData(
    API_ENDPOINTS.NEW_VEHICLE.NEWLY_LAUNCHED_VEHICLES(slugMake, vehicleType)
  );
  const fetchMakebyVehicles = await fetchListData(
    API_ENDPOINTS.NEW_VEHICLE.MAKE_BY_VEHICLES(slugMake || 'Toyota', vehicleType)
  );
  const fetchHondaVehicles = await fetchListData(
    API_ENDPOINTS.NEW_VEHICLE.MAKE_BY_VEHICLES(slugMake || 'Honda', vehicleType)
  );
  const fetchMakesByTypeData = await fetchListData(
    `${API_ENDPOINTS.BROWSE.BY_MAKE}?type=${vehicleType}`
  );

  // Determine if we should display 'MakesVehicles' or 'NewCarsModule'
  const matchedMake = fetchMakesByTypeData?.data?.find(make => 
    make?.name?.toLowerCase() === slugMake?.toLowerCase()
  );
  const altraNativesMake = fetchMakesByTypeData?.data?.filter(make => 
    make?.name?.toLowerCase() !== slugMake?.toLowerCase()
  );
  const isMakeVehicles = Boolean(matchedMake);


  // Render the components based on `isMakeVehicles` condition
  return (
    <>
      {!isMakeVehicles ? (
        <NewCarsModule 
          makes={makesAndBodies?.makes} 
          bodies={makesAndBodies?.bodies} 
          popularVehicles={popularVehicles} 
          fetchUpComingVehicles={fetchUpComingVehicles} 
          fetchNewlyLaunchedVehicles={fetchNewlyLaunchedVehicles} 
          fetchHondaVehicles={fetchHondaVehicles} 
          fetchMakesByTypeData={fetchMakesByTypeData} 
          params={params} 
          searchParams={searchParams} 
          fetchMakebyVehicles={fetchMakebyVehicles} 
        />
      ) : (
        <MakesVehicles 
          makes={makesAndBodies?.makes} 
          bodies={makesAndBodies?.bodies} 
          popularVehicles={popularVehicles} 
          fetchUpComingVehicles={fetchUpComingVehicles} 
          fetchNewlyLaunchedVehicles={fetchNewlyLaunchedVehicles} 
          fetchHondaVehicles={fetchHondaVehicles} 
          fetchMakesByTypeData={fetchMakesByTypeData} 
          params={params} 
          searchParams={searchParams} 
          slugMake={slugMake} 
          matchedMake={matchedMake} 
          fetchMakebyVehicles={fetchMakebyVehicles} 
          altraNativesMake={altraNativesMake}
          vehicleType={vehicleType}
          
        />
      )}
    </>
  );
}

export default NewCarsPage;
