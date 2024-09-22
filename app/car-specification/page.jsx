
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import CompareModule from "@/modules/compareModule/index"
import { fetchListData } from "@/services/vehicles";

const CarComparison =async () => {

    const reviewsVehicles = await fetchListData(
      `${API_ENDPOINTS.REVIEWS.REVIEWS_BY_VEHICLE}/Honda civic 111`
    );

    const reviewsVehiclesOverAll = await fetchListData(
      `${API_ENDPOINTS.REVIEWS.REVIEWS_BY_VEHICLE_OVERALL}/Honda/civic`
    );

    console.log('reviewsVehicles',reviewsVehiclesOverAll)
  return (
    <>
      <CompareModule reviewsVehicles={reviewsVehicles} reviewsVehiclesOverAll={reviewsVehiclesOverAll}/>
    </>
  );
};

export default CarComparison;
