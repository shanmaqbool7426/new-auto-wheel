import React from 'react'
import NewCarsModule from "@/modules/new-cars/index"
import MakesVehicles from "@/modules/make-vehicles/index"
import { fetchMakesAndBodies, fetchMakesByType, fetchVehiclsData } from '@/services/vehicles'
const NewCarsPage =async (params ,searchParams) => {
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
  const makesAndBodies= await fetchMakesAndBodies(params.params.newcarslug[0])
  // const reorderedSlug = reorderSlug(params.slug);
  // let loading = true;
  const slugMake = params.params.newcarslug[1]; 
  const popularVehicles = await fetchVehiclsData(`/t_${params.params.newcarslug[0]}/cn_new/sb_popular/mk_${slugMake}`);
  const fetchUpComingVehicles = await fetchVehiclsData(`/t_${params.params.newcarslug[0]}/cn_new/sb_upcoming/mk_${slugMake}`);
  const fetchToyotaVehicles = await fetchVehiclsData(`/t_${params.params.newcarslug[0]}/cn_new/mk_${company_1[params.params.newcarslug[0]]}`);
  const fetchHondaVehicles = await fetchVehiclsData(`/t_${params.params.newcarslug[0]}/cn_new/mk_${company_2[params.params.newcarslug[0]]}`);
  const fetchMakesByTypeData = await fetchMakesByType(`${params.params.newcarslug[0]}`);

  const matchedMake = fetchMakesByTypeData?.data && fetchMakesByTypeData?.data?.find(make => make?.name?.toLowerCase() === slugMake?.toLowerCase());
  const isMakeVehicles = Boolean(matchedMake); // `true` if a match is found, otherwise `false`

  return (
    <>
   {!isMakeVehicles && <NewCarsModule makes={makesAndBodies?.makes} bodies={makesAndBodies?.bodies} popularVehicles={popularVehicles} fetchUpComingVehicles={fetchUpComingVehicles}  fetchToyotaVehicles={fetchToyotaVehicles} fetchHondaVehicles={fetchHondaVehicles} fetchMakesByTypeData={fetchMakesByTypeData} params={params} searchParams={searchParams}/>}
   {isMakeVehicles && <MakesVehicles makes={makesAndBodies?.makes} bodies={makesAndBodies?.bodies} popularVehicles={popularVehicles} fetchUpComingVehicles={fetchUpComingVehicles}  fetchToyotaVehicles={fetchToyotaVehicles} fetchHondaVehicles={fetchHondaVehicles} fetchMakesByTypeData={fetchMakesByTypeData} params={params} searchParams={searchParams} slugMake={slugMake} matchedMake={matchedMake}/>}

   </>
  )
}

export default NewCarsPage