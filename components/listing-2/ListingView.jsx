"use client"
import { useState, useEffect, useMemo } from "react";
import ListingFilter from "@/components/listing/sidebar-filter";
import ListingPagination from "@/components/listing/pagination";
import { ListingHeader } from "@/components/listing/header";
import ListCardView from "@/components/ui/ListCardView";
import CarCard from "@/components/ui/CarCard";
import { Box, Container } from "@mantine/core";
import {
  fetchBodiesByType,
  fetchMakesByType,
  fetchVehiclsData,
  fetchVehicleDrives,
  fetchVehicleTransmissions,
  fetchVehicleFuelTypes,
  fetchVehicleColors,
} from "@/services/vehicles";
import { getLocalStorage } from "@/utils";
import VehicleComparison from "@/components/ComparisonCard";
import Breadcrumb from "@/components/Breadcrumb";
// import FilterBadges from "./FilterBadges";

export default function ListingView({ params, searchParams, initialData }) {
  const userData = getLocalStorage("user");
  const view = searchParams.view;
  
  // State for all the fetched data
  const [dataofVehcles, setDataofVehcles] = useState(initialData?.vehicles || null);
  const [vehicleMakes, setVehicleMakes] = useState(initialData?.makes || []);
  const [vehicleBodies, setVehicleBodies] = useState(initialData?.bodies || []);
  const [vehicleDrives, setVehicleDrives] = useState(initialData?.drives || []);
  const [vehicleTransmissions, setVehicleTransmissions] = useState(initialData?.transmissions || []);
  const [vehicleFuelTypes, setVehicleFuelTypes] = useState(initialData?.fuelTypes || []);
  const [vehicleColors, setVehicleColors] = useState(initialData?.colors || []);
  const [loading, setLoading] = useState(false);

  // Get the vehicle type from the path
  const vehicleType = params.slug?.[0] || 'car';
  
  const sortBy = searchParams.sortBy
    ? `sb_${searchParams.sortBy}`
    : null;

  // Get the filter parameters (everything after the first slug)
  const filterParams = params.slug?.slice(1) || [];

  // Add sortBy to filterParams if it exists
  const paramsWithSort = sortBy ? [...filterParams, sortBy] : filterParams;

  // Add view to filterParams if it exists
  const finalParams = view ? [...paramsWithSort, `view_${view}`] : paramsWithSort;

  // Memoize the finalParams to prevent unnecessary re-renders
  const memoizedFinalParams = useMemo(() => finalParams, [JSON.stringify(finalParams)]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const [
          vehiclesData,
          makesData,
          bodiesData,
          drivesData,
          transmissionsData,
          fuelTypesData,
          colorsData
        ] = await Promise.all([
          fetchVehiclsData([`used-${vehicleType}s`, ...memoizedFinalParams]),
          fetchMakesByType(vehicleType),
          fetchBodiesByType(vehicleType),
          fetchVehicleDrives(vehicleType),
          fetchVehicleTransmissions(vehicleType),
          fetchVehicleFuelTypes(vehicleType),
          fetchVehicleColors(vehicleType)
        ]);

        if (isMounted) {
          setDataofVehcles(data.vehicles);
          setVehicleMakes(data.makes);
          setVehicleBodies(data.bodies);
          setVehicleDrives(data.drives);
          setVehicleTransmissions(data.transmissions);
          setVehicleFuelTypes(data.fuelTypes);
          setVehicleColors(data.colors);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [vehicleType, memoizedFinalParams]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box pt={100} pb={80} className="product-listing position-relative">
      <div className="container-xl">
        <Container size="xl" px={0} mb={20}>
          <Breadcrumb items={generateBreadcrumbItems(params, vehicleType)} />
        </Container>

        <div className="row">
          <div className="col-lg-3">
            <ListingFilter
              type={vehicleType}
              makes={vehicleMakes}
              bodies={vehicleBodies}
              vehicles={dataofVehcles?.data}
              drives={vehicleDrives}
              transmissions={vehicleTransmissions}
              fuelTypes={vehicleFuelTypes}
              colors={vehicleColors}
            />
          </div>
          <div className="col-lg-9">
            <ListingHeader type={vehicleType} />
            <div className="row">
              {dataofVehcles?.data?.results?.map((vehicle, index) => (
                <div
                  key={index}
                  className={
                    searchParams.view === "grid" ? "col-12 col-sm-6 col-lg-4":"col-12"
                  }
                >
                  {searchParams.view === "grid" ? (
                    <CarCard
                      vehicle={vehicle}
                      index={index}
                      userData={userData}
                    />
                  ) : (
                    <ListCardView
                      index={index}
                      vehicle={vehicle}
                      userData={userData}
                    />
                  )}
                </div>
              ))}
            </div>
            <ListingPagination
              data={dataofVehcles?.data}
              type={params.slug}
            />
          </div>
        </div>
      </div>
      <VehicleComparison />
    </Box>
  );
} 