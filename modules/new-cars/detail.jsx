import BrowseVideos from "@/components/videos/browse-videos"
import BrowseBlogCarousel from "@/components/blog/browse-blogs-carousel"
import VehicleDetail from "./vehicle-detail"
import FAQ from "./faqs";

import Comments from "@/components/sections/Comments"

const NewVehicleDetailModule = ({ vehicle }) => {
  return (
    <div>
      <VehicleDetail vehicle={vehicle} />
      <BrowseVideos />
      <Comments />
      <BrowseBlogCarousel type={"car"} title={`${vehicle?.vehicleDetails?.make} ${vehicle?.vehicleDetails?.model} ${vehicle?.vehicleDetails?.year}`}/>
      {/* Faq's */}
      {vehicle?.vehicleDetails?.faqs?.length > 0 && <FAQ title={`${vehicle?.vehicleDetails?.make} ${vehicle?.vehicleDetails?.model} ${vehicle?.vehicleDetails?.variant} ${vehicle?.vehicleDetails?.year}`} titleSpan="FAQs" faqs={vehicle?.vehicleDetails?.faqs} />}
    </div>
  )
}

export default NewVehicleDetailModule
