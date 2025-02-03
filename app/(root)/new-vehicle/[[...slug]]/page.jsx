import NewVehicleDetailModule from "@/modules/new-cars/detail"
import { fetchVehicleBySlug } from '@/services/new-vehicles'
import { API_ENDPOINTS } from '@/constants/api-endpoints'

const NewVehicleDetailPage = async(params) => {
  const vehicle = await fetchVehicleBySlug(API_ENDPOINTS.NEW_VEHICLE.DETAIL(params.params.slug[0]));
  const variantsVehicles = await fetchVehicleBySlug(API_ENDPOINTS.NEW_VEHICLE.VARIENTS(params.params.slug[0]));
  return (
    <div>
      <NewVehicleDetailModule vehicle={vehicle.data} variantsVehicles={variantsVehicles}/>
    </div>
  )
}

export default NewVehicleDetailPage
