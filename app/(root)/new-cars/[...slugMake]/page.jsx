import React from "react";
import MakesVehicles from "@/modules/make-vehicles/index";
import NewVehicleDetailModule from "@/modules/new-cars/detail";
import { fetchMakesAndBodies } from "@/services/vehicles";
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

    console.log("variantsEndpoint",variantsEndpoint)
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

  const makesAndBodies = await fetchMakesAndBodies(vehicleType);
  return (
    <>
      <MakesVehicles
        makes={makesAndBodies?.makes}
        bodies={makesAndBodies?.bodies}
        slugMake={slugMake[0]}
        vehicleType={vehicleType}
        params={params}
      />
    </>
  );
};

export default NewCarsPage;
