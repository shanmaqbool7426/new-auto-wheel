import BrowseVideos from "@/components/videos/browse-videos"
import CarouselDetail from "./carousel-detail"

const NewVehicleDetailModule = ({vehicle}) => {
  return (
    <div>
        <CarouselDetail vehicle={vehicle}/>
      <BrowseVideos/>
    </div>
  )
}

export default NewVehicleDetailModule
