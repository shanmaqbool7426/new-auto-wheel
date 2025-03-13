import { useState, useEffect } from 'react';
import { 
  fetchBodiesByType, 
  fetchVehicleDrives, 
  fetchVehicleTransmissions, 
  fetchVehicleFuelTypes, 
  fetchVehicleColors, 
  fetchProvincesData 
} from "@/services/vehicles";

export const useVehicleData = (vehicleType) => {
  const [vehicleData, setVehicleData] = useState({
    bodies: [],
    drives: [],
    transmissions: [],
    fuelTypes: [],
    colors: [],
    provinces: []
  });

  const fetchData = async () => {
    const [
      vehicleBodies,
      vehicleDrives,
      vehicleTransmissions,
      vehicleFuelTypes,
      vehicleColors,
      provinceData
    ] = await Promise.allSettled([
      fetchBodiesByType(vehicleType),
      fetchVehicleDrives(vehicleType),
      fetchVehicleTransmissions(vehicleType),
      fetchVehicleFuelTypes(vehicleType),
      fetchVehicleColors(),
      fetchProvincesData("provinces")
    ]);

    setVehicleData({
      bodies: vehicleBodies?.value?.data || [],
      drives: vehicleDrives?.value?.data || [],
      transmissions: vehicleTransmissions?.value?.data || [],
      fuelTypes: vehicleFuelTypes?.value?.data || [],
      colors: vehicleColors?.value?.data || [],
      province: provinceData?.value?.data || []
    });
  };

  useEffect(() => {
    fetchData();
  }, [vehicleType]);

  return vehicleData;
};