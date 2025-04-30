'use server'

import {
  fetchBodiesByType,
  fetchMakesByType,
  fetchVehiclsData,
  fetchVehicleDrives,
  fetchVehicleTransmissions,
  fetchVehicleFuelTypes,
  fetchVehicleColors,
} from "@/services/vehicles";

export async function fetchVehicleData(vehicleType, params) {
  try {
    const [
      vehiclesData,
      makesData,
      bodiesData,
      drivesData,
      transmissionsData,
      fuelTypesData,
      colorsData
    ] = await Promise.all([
      fetchVehiclsData([`used-${vehicleType}s`, ...params]),
      fetchMakesByType(vehicleType),
      fetchBodiesByType(vehicleType),
      fetchVehicleDrives(vehicleType),
      fetchVehicleTransmissions(vehicleType),
      fetchVehicleFuelTypes(vehicleType),
      fetchVehicleColors(vehicleType)
    ]);

    return {
      vehicles: vehiclesData,
      makes: makesData,
      bodies: bodiesData,
      drives: drivesData,
      transmissions: transmissionsData,
      fuelTypes: fuelTypesData,
      colors: colorsData
    };
  } catch (error) {
    console.error('Error fetching vehicle data:', error);
    throw error;
  }
} 