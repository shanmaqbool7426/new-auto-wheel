import NewVehicleDetailModule from "@/modules/new-cars/detail"
import { fetchVehicleBySlug } from '@/services/vehicles'

const NewVehicleDetailPage = async(params,searchParams) => {
  const vehicle = await fetchVehicleBySlug(params);
  
  return (
    <div>
      <NewVehicleDetailModule vehicle={vehicle.data}/>
    </div>
  )
}

export default NewVehicleDetailPage
