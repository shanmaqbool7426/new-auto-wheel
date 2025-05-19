"use client"

import { Suspense } from "react";
import ListingFilter from "@/components/listing/sidebar-filter";
import ListingPagination from "@/components/listing/pagination";
import { ListingHeader } from "@/components/listing/header";
import ListCardView from "@/components/ui/ListCardView";
import CarCard from "@/components/ui/CarCard";
import { Box, Container } from "@mantine/core";
import { getLocalStorage } from "@/utils";
import VehicleComparison from "@/components/ComparisonCard";
import Breadcrumb from "@/components/Breadcrumb";
import { FilterBadges } from "@/components/listing/filter-badges";
import { useGetAllModelsQuery, useGetAllVarientsQuery, useGetMakesQuery } from "@/api-services/make";
import { useGetCitiesQuery } from "@/api-services/location";
import { useGetColorsByTypeQuery } from "@/api-services/color";
import { useGetDrivesQuery } from "@/api-services/drive";
import { useGetTransmissionsByTypeQuery } from "@/api-services/transmission";
import { useGetFuelTypesQuery } from "@/api-services/fuel-type";
import { useGetBodiesQuery } from "@/api-services/bodies";


export default function ListingClient({ 
  params, 
  searchParams, 
  vehicleType,
  initialData,
  breadcrumbItems 
}) {
  const userData = getLocalStorage("user");
  const view = searchParams.view;
  const { data: makesData } = useGetMakesQuery({type:vehicleType});
  const { data: modelsData } = useGetAllModelsQuery({type:vehicleType});
  const { data: varientsData } = useGetAllVarientsQuery({type:vehicleType});
  const { data: colorsData } = useGetColorsByTypeQuery({type:vehicleType});
  const { data: drivesData } = useGetDrivesQuery({type:vehicleType});
  const { data: transmissionsData } = useGetTransmissionsByTypeQuery({type:vehicleType});
  const { data: fuelTypesData } = useGetFuelTypesQuery({type:vehicleType});
  const { data: bodiesData } = useGetBodiesQuery({type:vehicleType});



  const { data: citiesData } = useGetCitiesQuery();


  console.log("makesData,modelsData,varientsData,colorsData,drivesData,transmissionsData,fuelTypesData",makesData,modelsData,varientsData,colorsData,drivesData,transmissionsData,fuelTypesData)
  return (
    <Box pt={100} pb={80} className="product-listing position-relative">
      <div className="container-xl">
        <Container size="xl" px={0} mb={20}>
          <Breadcrumb items={breadcrumbItems} />
        </Container>

        <div className="row">
          <div className="col-lg-3">
            <Suspense fallback={<div>Loading filters...</div>}>
              <ListingFilter
                type={vehicleType}
                makes={makesData?.data || []}
                bodies={bodiesData?.data?.bodies || []}
                models={modelsData?.data || []}
                varients={varientsData?.data || []}
                cities={citiesData?.data || []}
                drives={drivesData?.data?.drives || []}
                transmissions={transmissionsData?.data || []}
                fuelTypes={fuelTypesData?.data?.fuelTypes || []}
                colors={colorsData?.data || []}
                vehicles={initialData?.data || []}
              />
            </Suspense>
          </div>
          <div className="col-lg-9">
            <ListingHeader type={vehicleType} />
            <FilterBadges params={params} searchParams={searchParams} />
            <div className="row">
              {initialData?.data?.results?.length === 0 ? (
                <div className="no-results-message" style={{ width: "100%", textAlign: "center", margin: "40px 0" }}>
                  <div style={{ fontWeight: "bold", fontSize: "1.3rem", marginBottom: 8 }}>
                    Sorry! We could not find any results against your search criteria.
                  </div>
                  <div style={{ color: "#555", fontSize: "1rem" }}>
                    Use the options below to redefine your search.
                  </div>
                </div>
              ) : (
                initialData?.data?.results?.map((vehicle, index) => (
                  <div
                    key={vehicle._id}
                    className={
                      searchParams.view === "grid" ? "col-12 col-sm-6 col-lg-4" : "col-12"
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
                ))
              )}
            </div>

            <ListingPagination
              data={initialData?.data}
              type={params.slug}
            />
          </div>
        </div>
      </div>
      <VehicleComparison />
    </Box>
  );
} 