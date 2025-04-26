import React from "react";
import MakesVehicles from "@/modules/make-vehicles/index";
import NewVehicleDetailModule from "@/modules/new-cars/detail";
import { fetchListData, fetchMakesAndBodies } from "@/services/vehicles";
import { fetchVehicleBySlug, fetchVehicleByParams } from '@/services/new-vehicles';
import { API_ENDPOINTS, BASE_URL } from '@/constants/api-endpoints';

const NewCarsPage = async (params) => {
  const slugMake = params.params.slugMake || [""];
  const vehicleType = "car";
  
  if (slugMake.length === 2 || slugMake.length === 3) {
    const make = slugMake[0].replace(/-/g, ' ');
    const model = slugMake[1].replace(/-/g, ' ');
    const queryParams = new URLSearchParams();
    queryParams.append('make', make);
    queryParams.append('model', model);
    
    if (slugMake.length === 3) {
      queryParams.append('variant', slugMake[2].replace(/-/g, ' '));
    } else if (params.searchParams?.variant) {
      queryParams.append('variant', params.searchParams.variant.replace(/-/g, ' '));
    }
    const variantsEndpoint = `${API_ENDPOINTS.NEW_VEHICLE.VARIENTS}?${queryParams.toString()}`;

    const variantsVehicles = await fetchVehicleBySlug(`${variantsEndpoint}`);
    const referenceVehicle = {
      vehicleDetails : variantsVehicles?.data?.referenceVehicle,
    } 

    return (
      <div>
        <NewVehicleDetailModule vehicle={referenceVehicle} variantsVehicles={variantsVehicles} />
      </div>
    );
  }

  // Fetch initial data
  const makesAndBodies = await fetchMakesAndBodies(vehicleType);
  console.log("makesAndBodies", makesAndBodies)
  const bodySlug = makesAndBodies?.bodies?.data?.find(body => {
    return body.slug?.toLowerCase() === slugMake[0]?.toLowerCase()
  })
  // Fetch makes data for the specific make
  const popularVehicles = await fetchListData(
    API_ENDPOINTS.NEW_VEHICLE.MAKES_WITH_POPULAR(!bodySlug ? slugMake[0] : null, bodySlug, vehicleType)
  );
  
  const upcomingVehicles = await fetchListData(
    API_ENDPOINTS.NEW_VEHICLE.UPCOMMING(!bodySlug ?   slugMake[0] : null, bodySlug, vehicleType)
  );
  
  const newlyLaunchedVehicles = await fetchListData(
    API_ENDPOINTS.NEW_VEHICLE.NEWLY_LAUNCHED_VEHICLES(!bodySlug ? slugMake[0] : null, bodySlug, vehicleType)
  );
  
  const makeVehicles = await fetchListData(
    API_ENDPOINTS.NEW_VEHICLE.MAKE_BY_VEHICLES(!bodySlug ? slugMake[0] : null, bodySlug, vehicleType)
  );
  
  const makesByTypeData = await fetchListData(
    `${API_ENDPOINTS.BROWSE.BY_MAKE}?type=${vehicleType}`
  );
  
  return (
    <>
      <MakesVehicles
        makes={makesAndBodies?.makes}
        bodies={makesAndBodies?.bodies}
        slugMake={slugMake[0]}
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
