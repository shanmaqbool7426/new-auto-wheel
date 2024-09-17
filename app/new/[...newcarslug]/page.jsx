import React from 'react'
import NewCarsModule from "@/modules/new-cars/index"
import MakesVehicles from "@/modules/make-vehicles/index"
import { fetchListData, fetchMakesAndBodies, fetchMakesByType, fetchVehiclsData } from '@/services/vehicles'
import { API_ENDPOINTS } from '@/constants/api-endpoints'
const NewCarsPage = async (params, searchParams) => {
  const company_1 = {
    car: "Toyota",
    bike: "Suzuki",
    truck: "Forland"
  }
  const company_2 = {
    car: "Honda",
    bike: "Honda",
    truck: "ISUZU"
  }
  const makesAndBodies = await fetchMakesAndBodies(params.params.newcarslug[0])
  // const reorderedSlug = reorderSlug(params.slug);
  // let loading = true;
  const slugMake = params.params.newcarslug[1];
  
  const popularVehicles = await fetchListData(
    API_ENDPOINTS.NEW_VEHICLE.MAKES_WITH_POPULAR(slugMake, params.params.newcarslug[0])
  );

  
  const fetchUpComingVehicles = await fetchListData(
    API_ENDPOINTS.NEW_VEHICLE.UPCOMMING(slugMake, params.params.newcarslug[0])
  ); 
  const fetchNewlyLaunchedVehicles = await fetchListData(
    API_ENDPOINTS.NEW_VEHICLE.NEWLY_LAUNCHED_VEHICLES(slugMake, params.params.newcarslug[0]))
    
    const fetchMakebyVehicles = await fetchListData(
      API_ENDPOINTS.NEW_VEHICLE.MAKE_BY_VEHICLES(slugMake &&  slugMake || 'Toyota', params.params.newcarslug[0]))
      const fetchHondaVehicles  = await fetchListData(
        API_ENDPOINTS.NEW_VEHICLE.MAKE_BY_VEHICLES(slugMake &&  slugMake || 'Honda', params.params.newcarslug[0]))
        const fetchMakesByTypeData = await fetchListData(`${API_ENDPOINTS.BROWSE.BY_MAKE}?type=${params.params.newcarslug[0]}`);

        console.log('>>> slugMake, fetchUpComingVehicles',fetchUpComingVehicles,slugMake)
  
  const matchedMake = fetchMakesByTypeData?.data && fetchMakesByTypeData?.data?.find(make => make?.name?.toLowerCase() === slugMake?.toLowerCase());
  const isMakeVehicles = Boolean(matchedMake); // `true` if a match is found, otherwise `false`


  
  return (
    <>
      {!isMakeVehicles && <NewCarsModule makes={makesAndBodies?.makes} bodies={makesAndBodies?.bodies} popularVehicles={popularVehicles} fetchUpComingVehicles={fetchUpComingVehicles} fetchNewlyLaunchedVehicles={fetchNewlyLaunchedVehicles} fetchHondaVehicles={fetchHondaVehicles} fetchMakesByTypeData={fetchMakesByTypeData} params={params} searchParams={searchParams} fetchMakebyVehicles={fetchMakebyVehicles} />}
      {isMakeVehicles && <MakesVehicles makes={makesAndBodies?.makes} bodies={makesAndBodies?.bodies} popularVehicles={popularVehicles} fetchUpComingVehicles={fetchUpComingVehicles} fetchNewlyLaunchedVehicles={fetchNewlyLaunchedVehicles}  fetchHondaVehicles={fetchHondaVehicles} fetchMakesByTypeData={fetchMakesByTypeData} params={params} searchParams={searchParams} slugMake={slugMake} matchedMake={matchedMake} fetchMakebyVehicles={fetchMakebyVehicles}/>}

    </>
  )
}

export default NewCarsPage