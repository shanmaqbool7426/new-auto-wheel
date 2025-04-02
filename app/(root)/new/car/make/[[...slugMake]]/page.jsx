import React from "react";
import MakesVehicles from "@/modules/make-vehicles/index";
import { fetchMakesAndBodies } from "@/services/vehicles";

const NewCarsPage = async (params) => {
  // Extract slug values
  const [slugMake] = params.params.slugMake || [""];
  const vehicleType = "car";
  
  // Fetch only the makes and bodies data needed for initial rendering
  const makesAndBodies = await fetchMakesAndBodies(vehicleType);

  return (
    <>
      <MakesVehicles
        makes={makesAndBodies?.makes}
        bodies={makesAndBodies?.bodies}
        slugMake={slugMake}
        vehicleType={vehicleType}
        params={params}
      />
    </>
  );
};

export default NewCarsPage;
