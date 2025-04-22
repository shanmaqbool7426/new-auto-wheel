import BrowseVideos from "@/components/videos/browse-videos"
import BrowseBlogCarousel from "@/components/blog/browse-blogs-carousel"
import VehicleDetail from "./vehicle-detail"
import FAQ from "./faqs";
import CardsCarousel from "@/components/sections/CardsCarousel"
import SectionTopComparison from "@/components/sections/SectionTopComparison"

import Comments from "@/components/sections/Comments"
import ComparisonProducts from "../home/ComparisonProducts";
import { fetchMakesAndBodies, fetchVehicleCompetitors, fetchVehiclsData } from "@/services/vehicles";
import { reorderSlug } from "@/utils";

const NewVehicleDetailModule = async ({ vehicle, variantsVehicles }) => {
  const vehicleType = vehicle?.vehicleDetails?.type || 'car'; // Default to 'car' if type is not available
  const reorderedSlug = reorderSlug([`mk_${vehicle?.vehicleDetails?.make}`, `md_${vehicle?.vehicleDetails?.model}`]);
  
  const dataofVehcles = await fetchVehiclsData([`used-${vehicleType}s`, `mk_${vehicle?.vehicleDetails?.make}`, `md_${vehicle?.vehicleDetails?.model}`]);
  const competitors = await fetchVehicleCompetitors(vehicle?.vehicleDetails?._id);
  const makesAndBodies = await fetchMakesAndBodies(vehicle?.vehicleDetails?.type);


  return (
    <div>
      <VehicleDetail vehicle={vehicle} variantsVehicles={variantsVehicles} />
      <BrowseVideos type={vehicle?.vehicleDetails?.type} />
      <Comments bg="#F3F3F3" vehicleType={vehicle?.vehicleDetails?.type}
        fetchMakesByTypeData={makesAndBodies.makes} />
      {competitors?.length > 0 && (
        <CardsCarousel
          title={`${vehicle?.vehicleDetails?.make} ${vehicle?.vehicleDetails?.model} ${vehicle?.vehicleDetails?.year}`}
          primaryTitle={'Competitors'}
          data={competitors}
          isUsedVehicle={false}
        />
      )}
      {/* <SectionTopComparison /> */}
      <ComparisonProducts type={vehicle?.vehicleDetails?.type} />
      <CardsCarousel
        title={`Used ${vehicle?.vehicleDetails?.make} ${vehicle?.vehicleDetails?.model} for`}
        primaryTitle={'Sale'}
        data={dataofVehcles?.data?.results}
        isRating={false}
      />
      <BrowseBlogCarousel type={vehicle?.type} title={`${vehicle?.vehicleDetails?.make} ${vehicle?.vehicleDetails?.model} ${vehicle?.vehicleDetails?.year}`} />
      {/* Faq's */}
      {<FAQ title={`${vehicle?.vehicleDetails?.make} ${vehicle?.vehicleDetails?.model} ${vehicle?.vehicleDetails?.variant} ${vehicle?.vehicleDetails?.year}`} titleSpan="FAQs" faqs={vehicle?.vehicleDetails?.faqs} />}
    </div>
  )
}

export default NewVehicleDetailModule
